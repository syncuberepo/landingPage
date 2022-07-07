// 姓（カナ）
// 全角カタカナのみ（ひらがな、半角カタカナから変換可能であればチェックせず登録させたい）
// 名（カナ）
// 全角カタカナのみ（ひらがな、半角カタカナから変換可能であればチェックせず登録させたい）
// 電話番号
// 半角数字のハイフンなし（全角数字は可能であれば変換）
// FAX番号
// 半角数字のハイフンなし（全角数字は可能であれば変換
const form = document.forms[0];
const submitFunction = form.getAttribute('onSubmit');
console.log(submitFunction);
const origFuncName = submitFunction.split('; return ')[1];

const button = document.getElementById('formsubmit');
button.type = 'button';

const numCheck = (el) => {
    return ((! el?.value) || el.value.match(/^[0-9]+$/) != null);
};

const kataValCheck = (val) => {
    return ((! val) || val.match(/^[\u30a1-\u30f6]+$/) != null);
}

const hiraValCheck = (val) => {
    return ((! value) || val.match(/^[\u3041-\u3096]*$/) != null);
}

const hira2kata = (val) => {
    return val.replace(/[\u3041-\u3096]/g , (match) => {
        return String.fromCharCode(match.charCodeAt(0) + 0x60);
    });
}

const customCheck = () => {
    if (! numCheck(document.getElementById('Phone'))) {
        alert('電話番号は数字で入力してください。');
        document.getElementById('Phone')?.focus();
        return false;
    }
    if (! numCheck(document.getElementById('Fax'))) {
        alert('FAXは数字で入力してください。');
        document.getElementById('Fax')?.focus();
        return false;
    }
    const kanacCheck = (element, label) => {
        if (element?.value) {
            const convValue = hira2kata(element.value);
            if (! kataValCheck(convValue)) {
                alert(`${label}はカタカナで入力してください。`);
                element.focus();
                return false;
            }
            element.value = convValue;
            console.log(`${label}:${element.value}`);
        }
        return true;
    };
    const seiKana = document.getElementById('LEADCF1');
    if (! kanacCheck(seiKana, '姓（カナ）')) {
        return false;
    }
    const meiKana = document.getElementById('LEADCF2');
    if (! kanacCheck(meiKana, '名（カナ）')) {
        return false;
    }
    return true;
};

button.addEventListener('click', () => {
    if (! customCheck()) {
        return false;
    }
    const result = eval(origFuncName);
    console.log(`${origFuncName}:${result}`);
    if (result !== false) {
        console.log('check OK');
        form.submit();
    }
});

