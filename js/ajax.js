// ==================== picture 'cat'===============
function requestCat(){
 
    const requestURL = 'https://api.thecatapi.com/v1/images/search';
    
    const title = document.querySelector('.js-imgTitle');
    const image = document.querySelector('.js-img');
    const btn = document.querySelector('.js-imgBtn');
    // event  display on the page
    btn.onclick = ()=>{
        requestAPI('GET', requestURL)
            .then((data)=> myCode(data))
            .catch((error)=> console.log(error))
    }
    // display on the page
    function myCode(data){
        data.forEach((item,index)=>{
            if(image.complete){  // check for image loading
                image.setAttribute('src', item.url);
                title.innerHTML = `This picture "${item.id}"`;
            }
        })  
    }
    
    // request
    function requestAPI(method, url, body = null){

        return new Promise((resolve,reject)=>{
            // create a request
            let xhr = new XMLHttpRequest();
            // open request
            xhr.open(method, url);
            // accept and process the response
            xhr.responseType = 'json';
            xhr.onload = ()=>{
                if(xhr.status >= 400){
                    reject(xhr.response);
                }else{
                    resolve(xhr.response);
                }
            }
            xhr.onerror = ()=>{
                reject(xhr.response);
            }
            // send a request
            xhr.send(body);
        })

    }
}
requestCat();

// ===============   image   =================

function request(){
 
    const requestURL = 'https://jsonplaceholder.typicode.com/photos';

    const title = document.querySelector('.js-boxTitle');
    const image = document.querySelector('.js-boxImg');
    const btn = document.querySelector('.js-boxBtn');
    //event
    btn.onclick = ()=>{
        if(image.complete){
            requestAPI('GET', requestURL)
        }    
    }

    // Request
    function requestAPI(method, url, body = null){
            // create a request
            let xhr = new XMLHttpRequest();
            // open request
            xhr.open(method, url);
            // accept and process the response
            xhr.responseType = 'json';
            xhr.onload = ()=>{
                // console.log(xhr.status)
                if(xhr.status >= 400){
                    console.log(xhr.response);
                }else{
                    myCode(xhr.response);
                }
            }
            xhr.onerror = ()=>{
                console.log(xhr.response);
            }
            // send a request
            xhr.send(body);
    }

    // work with response result
    function myCode(posts){
        // find random index
        let randomIndex = Math.floor(Math.random()*(posts.length));
        // display on the page
        title.innerHTML = posts[randomIndex].title;
        image.setAttribute('src', posts[randomIndex].url);
    }
}
request();


// ===============  random counter(promise) ================
let number = document.querySelector('.js-counter span');
let count = document.querySelector('.js-counter');

// event clear counter
count.addEventListener('click', clear);
// function clear counter
function clear(){ 
    number.style.color = 'black';
    // run a promise
    run();
}     

// counter on promise
function counter(ms){
    return new Promise((resolve,reject)=>{
        let i = 0;
        f1();
        function f1(){
            // number generator
            let interval = Math.round(Math.random()*6);
            // display on the page
            number.innerHTML = interval;
            
            setTimeout(()=>{
                if(interval === 4){
                    number.style.color = '#01c913';
                    resolve('get interval 4');
                }else if(i > 5){
                    number.style.color = '#ff4141';
                    reject('end iterations');
                }else{
                    i++;
                    f1();
                }
            },ms)
        }
    })
}
// run a promise
function run(){
    counter(1500)
        .then((data)=> number.innerHTML = data)
        .then(()=> promise(please,1500))
        .then(()=> promise(clickForClear,1000))
        .catch((data)=> number.innerHTML = data)
 }
run()

// for writing text with delyed
function promise(fn,ms){
    return new Promise((resolve)=>{
        setTimeout(()=>resolve(fn()), ms);
    })
}
// text
function please(){
    number.innerHTML = 'please';
}
function clickForClear(){
    number.innerHTML += ' click for clear';
}

// ===============  promise  (in console)  =====================

function result1(){
    console.log('finish 1');
}
function result2(){
    console.log('finish 2 ');
}
function result3(){
    console.log('finish 3');
}
function result4(){
    console.log('Yep');
}
// the template is above
promise(result1,2000)
    .then(()=> promise(result2,3000))
    .then(()=> promise(result3,2000))
    .then(()=> promise(result4,1000));
    