document.getElementById('toggle').addEventListener('click', function (event) {
    event.preventDefault();
    console.log("toggle backgound change")
    var target = document.querySelector('#toggle');
    console.log(target.src)
    if (target.src.includes("sun.svg")){
        document.body.style.backgroundColor = "grey";
        target.src = 'moon.svg';
    }else if (target.src.includes("moon.svg")){
        document.body.style.backgroundColor = "white";
        target.src = 'sun.svg';
    }
  });