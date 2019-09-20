import cryptoJs from 'crypto-js'
const keyOne = '313233343536373a'
function jiami (word) {
    let key = cryptoJs.enc.Hex.parse(keyOne)
    if(typeof word==="number"){
        word+=""
    }
    let enc = ''
    if (typeof word === 'string') {
        enc = cryptoJs.AES.encrypt(word, key, {
            // iv: iv
            mode: cryptoJs.mode.ECB,
            padding: cryptoJs.pad.Pkcs7
        })
    } else if (typeof word === 'object') {
        let data = JSON.stringify(word)
        enc = cryptoJs.AES.encrypt(data, key, {
            // iv: iv
            mode: cryptoJs.mode.ECB,
            padding: cryptoJs.pad.Pkcs7
        })
    }
    let encResult = enc.ciphertext.toString()
    return encResult
}
// 解密函數
function jiemi (word) {
    try{
        let key = cryptoJs.enc.Hex.parse(keyOne)
        let dec = cryptoJs.AES.decrypt(cryptoJs.format.Hex.parse(word), key, {
        // vi: vi
        mode: cryptoJs.mode.ECB,
        padding: cryptoJs.pad.Pkcs7
        })
        let decData = cryptoJs.enc.Utf8.stringify(dec);
        try{
            return JSON.parse(decData);
        }catch(err){
            return decData;    
        }
        
    }catch(err){
        return null;
    }
    
}


let codeTab = {
    jiami,
    jiemi
}
export {
    codeTab
}