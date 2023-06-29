function hashCodeStr(str){
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
        var code = str.charCodeAt(i);
        hash = (hash << 5) - hash + code;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}

function hashStr(str) {
    let  hash = 0;
    const R = 31;
    for (let i = 0; i < str.length; i++)
        hash = (R * hash + str.charCodeAt(i));

    return hash;
}

// function usPhoneNumberHash(phone, M) {
//     const R = 31;
//     const hash = (((phone.area * R + phone.exch) % M) * R + phone.ext) % M;
// }

 /**
* Returns a hash code for this transaction.
*
* @return a hash code for this transaction
*/
// function transactionHashCode(transaction) {
//    let hash = 1;
//    hash = 31*hash + transaction.who.hashCode();
//    hash = 31*hash + transaction.when.hashCode();
//    hash = 31*hash + ((Double) (transaction.amount)).hashCode();
//    return hash;
//    // return Objects.hash(who, when, amount);
// }


function hashCode(input) {
    if (!input) return 0;

    if (input.hasOwnProperty('hasCode') && typeof input.hashCode === 'function') {
        return input.hashCode();
    }

    if (typeof input === 'string') {
        return hashCodeStr(input);
        // return hashStr(input);
    }

    if (typeof input === 'number') {
        return Math.floor(input);
    }

    return 0;
    
}

export { hashCode };