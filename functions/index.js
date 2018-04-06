'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

//Send notification to users when a purchase is made
// exports.notifyPurchase = functions.firestore.document("phoenix/purchases/{id}")
//     .onCreate(event => {
//         //Store value obtained from write action from database ref
//         const original = event.data.data();

//         //Log ID
//         console.log('purchase-completion', event.params.id, original);

//         //Storage reference
//         const fileName = 'gs://phoenix-master.appspot.com' + original.image;

//         //Log firename to console
//         console.log('Generated filename:', fileName);

//         //Storage request
//         const request = {
//             source: {
//                 imageUri: fileName
//             }
//         };

//         //Topic for android device to subscribe to
//         //This helps to target only devices on this channel with the 
//         //notifications
//         var topic = "purchases";

//         //Notification payload
//         var payload = {
//             data: {
//                 title: "Purchase completed",
//                 body: "Your purchase has been completed successfully. Please check details",
//                 id: original.id,
//                 key: original.key,
//                 price: original.price,
//                 items: original.items
//             }
//         };

//         return admin.messaging().sendToTopic(topic, payload)
//             .then((response) => {
//                 //Log result, if successfully sent notification
//                 return console.log("Successfully sent message:", response);
//             })
//             .catch((error) => {
//                 //Log error, if failed to send notification
//                 return console.log("Error sending message:", error);
//             });
//     });


//Send notification to users when new products are added to the collection
exports.notifyProducts = functions.firestore.document("phoenix/products/{category}/{id}")
    .onCreate(event => {
        //Store value obtained from write action from database ref
        const original = event.data.data();

        //Log ID
        console.log('product-upload', event.params.id, original);

        //Storage reference
        const fileName = 'gs://phoenix-master.appspot.com' + original.image;

        //Log firename to console
        console.log('Generated filename:', fileName);

        //Storage request
        const request = {
            source: {
                imageUri: fileName
            }
        };

        //Topic for android device to subscribe to
        //This helps to target only devices on this channel with the 
        //notifications
        var topic = "products";

        //Notification payload
        var payload = {
            data: {
                title: "New products available",
                body: "Check out our new range of products",
                id: original.id,
                key: original.key,
                price: original.price,
                items: original.items
            }
        };

        return admin.messaging().sendToTopic(topic, payload)
            .then((response) => {
                //Log result, if successfully sent notification
                return console.log("Successfully sent message:", response);
            })
            .catch((error) => {
                //Log error, if failed to send notification
                return console.log("Error sending message:", error);
            });
    });