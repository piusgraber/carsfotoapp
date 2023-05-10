import { fetchSQL_CW } from "./fetch"

export const addLogEntry2: any = async (leadid: number, user: number, text: string, reminder: Date) => {

   console.log('addLogEntry2')
   let reminderXML = 'null';
   //    console.log('entry', user, text, reminder)
   const sql = "insert into leadlog(leadid, userid, bemerkung, datumnext ) VALUES (0, " + user + ", '" + text + "', " + reminderXML + ")";
   //console.log(sql)
   const sres = await fetchSQL_CW(sql)
   //   console.log('sres ', sres)
   return {}
}


export const extractPhoneNumberCH = (phone: string) => {
   return '0' + phone.substring(3)
}


export const extractPhoneNumberIntl = (phone: string) => {
   if (!phone) return ''
//   console.log(phone)
   const numbersArray = phone.match(/\d+/g);
//   console.log(numbersArray)
   if (!numbersArray) return ''
   let numbersString = numbersArray.join("");
   console.log(numbersString); // Output: "123456"
   if (phone.startsWith('+')) {
//      console.log('+')
      numbersString = '+' + numbersString;
//      console.log(numbersString)
   }
   if (numbersString.startsWith('00')) {
      numbersString = '+' + numbersString.substring(2);
//      console.log(numbersString)
   }
   if (numbersString.startsWith('0')) {
      numbersString = '+41' + numbersString.substring(1);
 //     console.log(numbersString)
   }
   if (numbersString.startsWith('+41')) {
      if (numbersString.length != 12) {
         numbersString = '+?????????'
      }
   }
   if (!numbersString.startsWith('+41')) {
      return ''
   }
//   console.log(numbersString)
   return numbersString
}