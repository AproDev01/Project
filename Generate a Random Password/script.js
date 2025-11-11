const passwordBox=document.getElementById("Password");
const lenght=12;
const upperCase="ASADFGHJPOIUZTRE";
const LowerCase="ewrfuipljkjdrw22233er";
const number="2345678909876";
const symbole="+*ç%&/()=?=)(/&%çç)";
const allChars= upperCase +LowerCase+number+symbole;
function createPassword(){
    let password ="";
    password += upperCase[Math.floor(Math.random()*upperCase.length)];
    password += LowerCase[Math.floor(Math.random()*LowerCase.length)];
    password += number[Math.floor(Math.random()*number.length)];
    password += symbole[Math.floor(Math.random()*symbole.length)];
    while(lenght> password.length){
        password += allChars[Math.floor(Math.random()*allChars.length)];

    }
    passwordBox.value=password;
}

function copyPassword() {
    passwordBox.select();
    document.execCommand("copy");

    const tooltip = document.getElementById("copyTooltip");

    tooltip.style.opacity = "1";

    setTimeout(() => {
        tooltip.style.opacity = "0";
    }, 2000);
}