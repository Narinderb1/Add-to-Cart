import{ initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import{ getDatabase,ref,push,onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
const appSettings={
    databaseURL:"https://cart-mobile-app-9ec60-default-rtdb.asia-southeast1.firebasedatabase.app/"
}
const app = initializeApp(appSettings);
const database=getDatabase(app);
const shoppingListInDb=ref(database,"shoppingList")
const shoppingListEl=document.getElementById("shopping-list")
onValue(shoppingListInDb,function(snapshot){
      if(snapshot.exists()){
      let itemsArray=Object.entries(snapshot.val());
      shoppingListEl.innerHTML=""
  for(let i=0;i<itemsArray.length;i++){
    let ele=itemsArray[i];
    let currentItemID=ele[0];let currentItem=ele[1];
    gettingElementIntoList(shoppingListEl,ele);
  }
      }
  else{
    shoppingListEl.innerHTML="No item added yet..."
  }
})

const inputEl=document.getElementById("input-el");
const btnEl=document.getElementById("btn-el")
btnEl.addEventListener("click",function(){
    let val=inputEl.value;
    push(shoppingListInDb,val);
    clearInputField(inputEl);
})
function clearInputField(input){
  input.value="";
}
function gettingElementIntoList(list,val){
  let valID=val[0];let valItem=val[1];
  let newEl=document.createElement("li");
  newEl.textContent=valItem;
  newEl.addEventListener("dblclick",function(){
    let eleIDtoBeDeleted=ref(database,`shoppingList/${valID}`);
    remove(eleIDtoBeDeleted);
  })
  list.append(newEl)
}