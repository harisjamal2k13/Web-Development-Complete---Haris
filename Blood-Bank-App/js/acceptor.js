ifLoggedOut();

let bloodSelect = document.getElementById("bloodType");
let donorList = document.getElementById("donorList");
let counter = 0; 


let findDonor = () => {

    let bloodType = bloodSelect.options[bloodSelect.selectedIndex].value;

    switch(bloodType){
        case "O-":
            remover();
            ONegative();  
            break;
        case "O+":
            remover();
            // ONegative();
            OPostive();
            break;            
        case "A-":
            remover();
            // ONegative();
            ANegative();
            break;
        case "A+":
            remover();
            // ONegative();
            // OPostive();
            // ANegative();
            APostive();
            break;
        case "B-":
            remover();
            // ONegative();
            BNegative();
            break;
        case "B+":
            remover();
            // ONegative();
            // OPostive();
            // BNegative();
            BPostive();
            break;
        case "AB-":
            remover();
            // ONegative();
            // ANegative();
            // BNegative();
            ABNegative();
            break;
        case "AB+":
            remover();
            // ONegative();
            // OPostive();
            // ANegative();
            // APostive();
            // BNegative();
            // BPostive();
            // ABNegative();
            ABPostive();
            break;
        default:
             break;
    }


    // console.log(donorListLast);
}


// Blood Data Getting Functions

let OPostive = () => {
    database.ref().child("donors/O+").on("child_added", function(snapshot) {
        let donorData = snapshot.val();
        let donorBloodType = "O+";
        // donorData.id = snapshot.key;
            render(donorData, donorBloodType);
        // console.log(donorData);
    })
}

let APostive = () => {
    database.ref().child("donors/A+").on("child_added", function(snapshot) {
        let donorData = snapshot.val();
        let donorBloodType = "A+";        
        // donorData.id = snapshot.key;
            render(donorData, donorBloodType);
        // console.log(donorData);
    })
}

let BPostive = () => {
    database.ref().child("donors/B+").on("child_added", function(snapshot) {
        let donorData = snapshot.val();
        let donorBloodType = "B+";                
        donorData.id = snapshot.key;
            render(donorData, donorBloodType);
        // console.log(donorData);
    })
}

let ABPostive = () => {
    database.ref().child("donors/AB+").on("child_added", function(snapshot) {
        let donorData = snapshot.val();
        let donorBloodType = "AB+";                
        // donorData.id = snapshot.key;
            render(donorData, donorBloodType);
        // console.log(donorData);
    })
}

let ONegative = () => {
    database.ref().child("donors/O-").on("child_added", function(snapshot) {
        let donorData = snapshot.val();
        let donorBloodType = "O-";                
        // donorData.id = snapshot.key;
            render(donorData, donorBloodType);
        // console.log(donorData);
    })
}

let ANegative = () => {
    database.ref().child("donors/A-").on("child_added", function(snapshot) {
        let donorData = snapshot.val();
        let donorBloodType = "A-";                        
        // donorData.id = snapshot.key;
            render(donorData, donorBloodType);
        // console.log(donorData);
    })
}

let BNegative = () => {
    database.ref().child("donors/B-").on("child_added", function(snapshot) {
        let donorData = snapshot.val();
        let donorBloodType = "B-";                
        // donorData.id = snapshot.key;
            render(donorData, donorBloodType);
        // console.log(donorData);
    })
}

let ABNegative = () => {
    database.ref().child("donors/AB-").on("child_added", function(snapshot) {
        let donorData = snapshot.val();
        let donorBloodType = "AB-";                
        // donorData.id = snapshot.key;
            render(donorData, donorBloodType);
        // console.log(donorData);
    })
}

// Render Function

let render = (donorData, donorBloodType) =>{

    console.log(donorData);    
    counter = counter + 1;

    //Making TR

        let donorListLast = donorList.lastElementChild;
        let donorListRow = document.createElement("TR");
    
    //Adding Serial Number

        let donorNumber = document.createElement("TD");
        let donorNumberText = document.createTextNode(counter);
        donorNumber.appendChild(donorNumberText);    


    //Getting donor's name and email and rendering
    
        let donorName = document.createElement("TD");
        let donorEmail = document.createElement("TD");

        database.ref('/user/' + donorData.userID).once('value').then(function(snapshot) {

            let donorInfo = snapshot.val();
            
            //Adding donor name
            let donorNameText = document.createTextNode(donorInfo.name);
            donorName.appendChild(donorNameText);

            //Adding donor email
            // let donorEmail = document.createElement("TD");
            let donorEmailText = document.createTextNode(donorInfo.email);
            donorEmail.appendChild(donorEmailText);
            
        });

    // Adding BloodType
    let bloodType = document.createElement("TD");
    let bloodTypeText = document.createTextNode(donorBloodType);
    bloodType.appendChild(bloodTypeText);

    //Adding Date

        let donorDate = document.createElement("TD");
        let donorDateText = document.createTextNode(donorData.date);
        donorDate.appendChild(donorDateText);

    //Appending to TableBody
    
        donorListRow.appendChild(donorNumber);
        donorListRow.appendChild(donorName);
        donorListRow.appendChild(bloodType);
        donorListRow.appendChild(donorEmail);
        donorListRow.appendChild(donorDate);
        
        donorListLast.appendChild(donorListRow);
}


// OPostive();
// APostive();
// BPostive();
// ABPostive();

// ONegative();
// ANegative();
// BNegative();
// ABNegative();

// Previous Child Remover Function
let remover = () => {
    //Setting counter back to zero
    counter = 0;
    // Getting the Table Body
    let donorListLast = donorList.lastElementChild;   
    //Deleting all child nodes(previos rendered data) 
    while (donorListLast.hasChildNodes()) {
        donorListLast.removeChild(donorListLast.lastChild);
      }
}