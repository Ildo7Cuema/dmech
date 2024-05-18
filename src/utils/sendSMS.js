// SMS normal
export default function sendSMS(dataSMS) {
  const myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "App ce0828bae76ab04b24f999aeff8bb0db-d2a5d3f1-d717-413c-81d9-b527747e16be"
  );
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/json");

  const raw = JSON.stringify({
    messages: [
      {
        destinations: [{ to: "244" + dataSMS.phone }],
        from: "ServiceSMS",
        text:
          "Ola! " +
          dataSMS.name +
          ".\nObrigado por se registar no nosso Software de gestão de serviços Administrativos e académico. Desde já, para utilização dos mesmos, confirme a sua subscrição no link que enviamos para ti no correio: " +
          dataSMS.email,
      },
    ],
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("https://z1l3d3.api.infobip.com/sms/2/text/advanced", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

  //sendSMSWhatsap(dataSMS);
}

// function sendSMSWhatsap(data) {
//   const myHeaders = new Headers();
//   myHeaders.append(
//     "Authorization",
//     "App ce0828bae76ab04b24f999aeff8bb0db-d2a5d3f1-d717-413c-81d9-b527747e16be"
//   );
//   myHeaders.append("Content-Type", "application/json");
//   myHeaders.append("Accept", "application/json");

//   const raw = JSON.stringify({
//     messages: [
//       {
//         from: "447860099299",
//         to: "244" + data.phone,
//         messageId: "9e47d03a-deb6-448f-b7cf-fcb6ddf1cf40",
//         content: {
//           templateName:
//             "Ola! " +
//             data.name +
//             ".\nObrigado por se registar no nosso Software de gestão de serviços Administrativos e académico. Desde já, para utilização dos mesmos, confirme a sua subscrição no link que enviamos para ti no correio: " +
//             data.email,
//           templateData: {
//             body: {
//               placeholders: ["Ildo"],
//             },
//           },
//           language: "en",
//         },
//       },
//     ],
//   });

//   const requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: raw,
//     redirect: "follow",
//   };

//   fetch(
//     "https://z1l3d3.api.infobip.com/whatsapp/1/message/template",
//     requestOptions
//   )
//     .then((response) => response.text())
//     .then((result) => console.log(result))
//     .catch((error) => console.error(error));
// }
