let budgetArray = JSON.parse(localStorage.getItem("budget")) || [];
const addBudget = () => {
  let proName = productName.value;
  let proQuant = productQuant.value;
  let proPrice = productPrice.value;
  let proObject = { proName, proQuant, proPrice };

  if (proName !== "" && proQuant !== "" && proPrice !== "") {
    productName.value = "";
    productQuant.value = "";
    productPrice.value = "";

    budgetArray.push(proObject);
    localStorage.setItem("budget", JSON.stringify(budgetArray));
    window.location.href = "trackIt.html"
  }else{
    display.innerHTML = `<p class="alert alert-danger w-100 col-lg col-sm col-md">fill the input</p>`;
  }
};

console.log(budgetArray);


// result page

let totalAmountSpent = 0;


const displayAll = () => {
  // clear the card
  resultDiv.innerHTML = ""
  budgetArray.map((product, i)=>{
    let productCost = product.proQuant * product.proPrice
    totalAmountSpent += productCost
    resultDiv.innerHTML += `
    ${product.proName}
    ${product.proQuant}
    ${product.proPrice}


    
    <button onclick="deleteAny(${i})" class="btn btn-danger text-light fw-bold" >delete</button>
    <a href="#" class="btn btn-warning text-light fw-bold" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal1-${i}">Edit</a>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal1-${i}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog mt-5 ">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Edit</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div id="showErr"></div>
            <input type="text" placeholder="New name" id="productName-${i}" class="form-control mb-3">
            <input type="number"  placeholder="New quantity" id="quantityOwn-${i}" class="form-control mb-3">
            <input type="number" placeholder=" New price" id="priceName-${i}" class="form-control">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-warning" onclick="editAny(${i})" data-bs-dismiss="modal">Edit</button>
          </div>
        </div>
      </div>
    </div>
    </div>`;
    
    
    
  })
}

displayAll()


if (budgetArray.length > 0) {
  document.getElementById("resultDiv").innerHTML += `<p class="text-light fw-bold bg-success p-2 text-center w-100 ">Total Budget: &#8358;${totalAmountSpent.toFixed(2)}</p>`;
} else {
  document.getElementById("resultDiv").innerHTML += `<h2 class="fw-bold textColor">No item added</h2>`;
}

const editAny = (i) => {
  budgetArray[i]["proName"] = document.getElementById(`productName-${i}`).value;
  budgetArray[i]["proQuant"] = document.getElementById(`quantityOwn-${i}`).value;
  budgetArray[i]["proPrice"] = document.getElementById(`priceName-${i}`).value;
  localStorage.setItem("budget", JSON.stringify(budgetArray));
  totalSpent = 0; 
  resultCard.innerHTML = "";
  displayAll();
  if (budgetArray.length > 0) {
    document.getElementById("resultDiv").innerHTML += `<p class="text-light fw-bold bg-success p-2 text-center w-100">Total Budget: &#8358;${totalAmountSpent.toFixed(2)}</p>`;
  }
};


const deleteAny = (i) => {
  budgetArray.splice(i, 1);
  localStorage.setItem("budget", JSON.stringify(budgetArray));
  totalSpent = 0; 
  resultDiv.innerHTML = ""; 
  displayAll(); // Redisplay the updated cards
  if (budgetArray.length > 0) {
    document.getElementById("resultDiv").innerHTML += `<p class="text-light fw-bold bg-success p-2 text-center w-100">Total Budget: &#8358;${totalAmountSpent.toFixed(2)}</p>`;
  } else {
    resultDiv.innerHTML = ""
    document.getElementById("resultDiv").innerHTML += `<h2 class="fw-bold textColor">No item added</h2>`;
  }
  // setTimeout(()=>{
  //   errorx.style.display = "none"
  // }, 2000)
};
