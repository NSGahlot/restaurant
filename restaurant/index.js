function handleFormSubmit(event) {
  event.preventDefault();
  orderDetails = {
    choosePrice: event.target.choosePrice.value,
    chooseDish: event.target.chooseDish.value,
    choosetable: event.target.chooseTable.value,
  };
  axios
    .post(
      "https://crudcrud.com/api/1ee6068bb6774bb8a287aa332621f26c/orderDetails",
      orderDetails
    )
    .then((response) => displayUserOnScreen(response.data))
    .catch((error) => console.log(error));
}

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get(
      "https://crudcrud.com/api/1ee6068bb6774bb8a287aa332621f26c/orderDetails"
    )
    .then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        displayUserOnScreen(response.data[i]);
      }
    })
    .catch((error) => console.log(error));
});

const url_route =
  "https://crudcrud.com/api/1ee6068bb6774bb8a287aa332621f26c/orderDetails";

function displayUserOnScreen(orderDetailsResponse) {
  const ul = document.createElement("ul");
  const li = document.createElement("li");
  let table;

  li.textContent =
    orderDetailsResponse.choosePrice +
    " - " +
    orderDetailsResponse.chooseDish +
    " - " +
    orderDetailsResponse.choosetable;
  li.id = orderDetailsResponse._id;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  li.appendChild(deleteBtn);

  ul.appendChild(li);

  deleteBtn.addEventListener("click", function (event) {
    axios
      .delete(url_route + "/" + event.target.parentElement.id)
      .then((result) => console.log(result))
      .catch((error) => console.log(error));

    ul.removeChild(li);
  });

  const table1 = document.getElementById("table1");
  const table2 = document.getElementById("table2");
  const table3 = document.getElementById("table3");

  const chooseTable = orderDetailsResponse.choosetable;

  table = chooseTable.value;
  if (table === table1.id || chooseTable === table1.id) {
    table1.appendChild(ul);
  } else if (table === table2.id || chooseTable === table2.id) {
    table2.appendChild(ul);
  } else {
    table3.appendChild(ul);
  }
}
