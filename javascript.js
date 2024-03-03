



async function List_Bank() {
    try {
        let url = "https://api.vietqr.io/v2/banks"
        let res = await axios.get(url);
        let data = res.data.data.slice(0, 10);
        let htmlString = '';
        data.forEach((bank, key) => {
            let name = bank.name.replace("Ngân hàng", '').replace("TMCP", '');
            htmlString += `<option class="option${bank.code.toLowerCase()}" value=${bank.code} key=${key + 1}> ${bank.code} - ${name} </option>`;
        });
        document.getElementById("Ma_Bank").innerHTML = htmlString
    } catch (er) {
        alert(er)
    }
}
List_Bank();
document.getElementById("Form").addEventListener("submit", (e) => {
    try {
        e.preventDefault();
        let Ma_Bank = document.getElementById('Ma_Bank').value;
        let STK_Bank = document.getElementById('STK_Bank').value;
        let TIEN_Bank = document.getElementById('TIEN_Bank').value;
        let ND_Bank = document.getElementById('ND_Bank').value;
        if (!isEmpty(STK_Bank) && !isEmpty(TIEN_Bank)) {
            CreatQrCode(Ma_Bank, STK_Bank, TIEN_Bank.replace(/\./g, ''), ND_Bank, "is Name")
            document.querySelector(".wrapper_qr").style.display = "flex";
            document.getElementById("Form").reset();
            document.getElementById('STK_Bank').focus();
            document.getElementById('test').innerHTML = ND_Bank;
        } else {
            alert("Không để trống?")
        }
    }
    catch (er) {
        alert(er)
    }

})

let wrapper_qr = document.querySelector(".wrapper_qr");
let qr = document.querySelector(".qr");
wrapper_qr.addEventListener("click", (e) => {
    if (e.target === qr) {
        return;
    }
    wrapper_qr.style.display = "none"
})


// fun
function isEmpty(value) {
    return value === null || value.trim() === '';
}


function CreatQrCode(Ma_Bank, STK_Bank, TIEN_Bank, ND_Bank, Name) {
    var qr = document.querySelector('.qr');
    qr.src = `https://img.vietqr.io/image/${Ma_Bank}-${STK_Bank}-compact2.png?amount=${TIEN_Bank}&addInfo=${ND_Bank}&accountName=${Name}`;

}

function formatInput(input, type) {
    let value = input.value;
    value = value.replace(/\D/g, '');
    if (type == "stk") {

    }
    if (type == "tien") {
        if (!isNaN(parseInt(value))) {
            value = formatNumber(parseInt(value));
        }
    }
    input.value = value;
}

function formatNumber(number) {
    return number.toLocaleString('vi-VN');
}



