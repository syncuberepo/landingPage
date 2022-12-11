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
    return ((! val) || val.match(/^[\u30a1-\u30f6\u30FC]+$/) != null);
}

const hiraValCheck = (val) => {
    return ((! value) || val.match(/^[\u3041-\u3096]*$/) != null);
}

const hira2kata = (val) => {
    return val.replace(/[\u3041-\u3096]/g , (match) => {
        return String.fromCharCode(match.charCodeAt(0) + 0x60);
    });
}

/** カスタムチェック */
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

// 選択リストの選択結果による表示
/** 入力ブロックを非表示にする */
closeBlock = (el) => {
    el.parentElement.parentElement.style = 'display: none;'
};
/** 入力ブロックを表示する */
openBlock = (el) => {
    el.parentElement.parentElement.style = 'display: flex;'
};
/** 入力ブロックが表示されているかチェックする */
isOpenBlock = (el) => {
    const style = el.parentElement.parentElement.style.cssText;
    console.log(style);
    return style.includes('flex;');
}
/** 入力ブロックのラベルを取得する */
getLabel = (el) => {
    const childs = el.parentElement.parentElement.childNodes;
    const label = childs[1].textContent.replace('必須','');
    console.log(label);
    return label;
}

const industry = document.getElementById('Industry');
const useTablePlan = document.getElementById('LEADCF8');
const useTm = document.getElementById('LEADCF9');
const useTmPlan = document.getElementById('LEADCF10');
const pickupTm = document.getElementById('LEADCF11');
const otherTm = document.getElementById('LEADCF7');

/** オプション選択項目をクローズする */
optionSelectorAllClose = () => {
    closeBlock(useTmPlan);
    closeBlock(pickupTm);
    closeBlock(otherTm);
};

if (industry !== null) {
    optionSelectorAllClose();
    /** 利用中の勤怠システム選択時のイベント処理 */
    useTm.addEventListener('change', (ev) => {
        optionSelectorAllClose();
        if (useTm.value === 'あり') {
            openBlock(pickupTm);
        }
        if (useTm.value === 'なし') {
            openBlock(useTmPlan);
        }
    });
    /** 勤怠システム利用予定選択時のイベント処理 */
    useTmPlan.addEventListener('change', (ev) => {
        closeBlock(pickupTm);
        closeBlock(otherTm);
        if (useTmPlan.value === 'あり') {
            openBlock(pickupTm);
        }
    });
    /** 勤怠システム名選択時のイベント処理 */
    pickupTm.addEventListener('change', (ev) => {
        closeBlock(otherTm);
        if (pickupTm.value === 'その他') {
            openBlock(otherTm);
        }
    });
}

/** オプション選択項目の必須入力チェックを行う */
const customRequireCheck = () => {
    // 業界が存在する場合のみチェックを実施。
    if (industry === null) {
        return true;
    }
    const isDefaltSelected = (el) => {
        return el.options[el.selectedIndex].value === ''
    };
    const isEmpty = (el) => {
        return (((el.value).replace(/^\s+|\s+$/g, '')).length == 0);
    }
    const errorProc = (el) => {
        alert(getLabel(el)+' は入力必須です。'); 
        el.focus();
        return false;
    }
    if (isDefaltSelected(industry)) {
        return  errorProc(industry);
    }
    if (isDefaltSelected(useTablePlan)) {
        return  errorProc(useTablePlan);
    }
    if (isDefaltSelected(useTm)) {
        return  errorProc(useTm);
    }
    if (isOpenBlock(useTmPlan) && isDefaltSelected(useTmPlan)) {
        return errorProc(useTmPlan);
    }
    if (isOpenBlock(pickupTm) && isDefaltSelected(pickupTm)) {
        return errorProc(pickupTm);
    }
    if (isOpenBlock(otherTm) && isEmpty(otherTm)) {
        return errorProc(otherTm);
    }
    return true;
}

// 登録ボタンのイベント処理
button.addEventListener('click', () => {
    if (! customCheck()) {
        return false;
    }
    if (!customRequireCheck()) {
        return false;
    }
    const result = eval(origFuncName);
    console.log(`${origFuncName}:${result}`);
    if (result !== false) {
        console.log('check OK');
        form.submit();
    }
});

