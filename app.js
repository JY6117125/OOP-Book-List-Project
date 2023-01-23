//BOOK
function Book(title, author, isbn){
    this.title=title;
    this.author=author;
    this.isbn=isbn;

}
//UI
function UI(){}


UI.prototype.addbooktolist= function(book){

    const list= document.getElementById('booklist');
    const row = document.createElement("tr");
    console.log(row)
    row.innerHTML=`    
        <td>${book.title}</td> 
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X<a></tb>
        `;
    list.appendChild(row);
}

UI.prototype.showAlert=function(message,classname){
    const div=document.createElement('div');
    div.className=`alert ${classname}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form=document.querySelector('#book-form');
    container.insertBefore(div,form);
    setTimeout(function(){
        document.querySelector('.alert').remove();
    },3000)
}
 
UI.prototype.deletebook=function(target){
    if(target.className==="delete"){
        target.parentElement.parentElement.remove();
    }
}

UI.prototype.clearfields=function(){
    document.getElementById('title').value='';
    document.getElementById('author').value='';
    document.getElementById('isbn').value='';
}
document.getElementById('book-form').addEventListener('submit',
    function(e){
        
        const title= document.getElementById('title').value,
              author= document.getElementById('author').value,
              isbn= document.getElementById('isbn').value
        const book= new Book(title, author, isbn);

        const Ui = new UI(book);

        if(title===''||author===""||isbn===""){
            Ui.showAlert('pls, fill in alll fields',"error");
        }
        else{
            Ui.addbooktolist(book);

            Ui.clearfields();
            Ui.showAlert('book added',"success");

        }



        e.preventDefault();
});

document.getElementById("booklist").addEventListener('click',
function(e){
    const ui=new UI();
    ui.deletebook(e.target);

    ui.showAlert("book removed", "success")
    e.preventDefault();

});