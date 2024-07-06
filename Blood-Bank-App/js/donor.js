ifLoggedOut();

let bloodSelect = document.getElementById("bloodType");
let weightInput = document.getElementById("weightInput");
let weightError = document.getElementById("weightError");
let donateSuccess = document.getElementById("donateSuccess");

let date = () => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    
    if(dd<10) {
        dd = '0'+dd;
    } 
    
    if(mm<10) {
        mm = '0'+mm;
    } 
    
    today = mm + '/' + dd + '/' + yyyy;
    return today;
}


let donate = () => {
    let bloodType = bloodSelect.options[bloodSelect.selectedIndex].value;
    let weight = weightInput.value;
    let donateDate = date();
    let donorData = {
        date : donateDate,
        userID : currentUser.key,
    }
    
    if (weight < 50 && weight >= 0){
        let alertBox = document.createElement("DIV");
        alertBox.setAttribute("class", "alert d-block alert-danger alert-dismissible fade show");        
        let closeBtn = document.createElement("BUTTON");
        closeBtn.setAttribute("type", "button");
        closeBtn.setAttribute("class", "close");
        closeBtn.setAttribute("data-dismiss", "alert");
        
        let closeBtnSpan = document.createElement("SPAN");
        let closeBtnSpanClose = document.createTextNode("x");
        let alertMessageStrong = document.createElement("STRONG");
        let alertMessageStrongText = document.createTextNode("Error!");
        let alertMessageOtherText = document.createTextNode(" Weight must be over 50!");
        
        closeBtnSpan.appendChild(closeBtnSpanClose);
        closeBtn.appendChild(closeBtnSpan);
        alertBox.appendChild(closeBtn);
        
        alertMessageStrong.appendChild(alertMessageStrongText);
        alertBox.appendChild(alertMessageStrong);
        alertBox.appendChild(alertMessageOtherText);
        weightError.appendChild(alertBox);
    }
    else{
        database.ref().child("donors/"+ bloodType).push(donorData);

        let alertBox = document.createElement("DIV");
        alertBox.setAttribute("class", "alert d-block alert-success alert-dismissible fade show");        
        let closeBtn = document.createElement("BUTTON");
        closeBtn.setAttribute("type", "button");
        closeBtn.setAttribute("class", "close");
        closeBtn.setAttribute("data-dismiss", "alert");
        
        let closeBtnSpan = document.createElement("SPAN");
        let closeBtnSpanClose = document.createTextNode("x");
        let alertMessageStrong = document.createElement("STRONG");
        let alertMessageStrongText = document.createTextNode("Success!");
        let alertMessageOtherText = document.createTextNode(" Blood donated!");
        
        closeBtnSpan.appendChild(closeBtnSpanClose);
        closeBtn.appendChild(closeBtnSpan);
        alertBox.appendChild(closeBtn);
        
        alertMessageStrong.appendChild(alertMessageStrongText);
        alertBox.appendChild(alertMessageStrong);
        alertBox.appendChild(alertMessageOtherText);
        donateSuccess.appendChild(alertBox);
    }
    
}
