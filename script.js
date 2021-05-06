const BANNER_TYPE_REF = document.getElementById("bannerType");
const IMAGE_PREVIEW_REF = document.getElementById("preview_image");
const CANVAS_REF = document.getElementById("preview_canvas");
const FORM_BANNER_REF = document.getElementById("dynamic_form");

let STATE = {};

const BANNER_MAPED = {
  INSTA: {
    file: "./resources/insta.png",
    width: 1080,
    height: 1920,
    fontBase: "35pt BebasNeue, Addictive",
    preview: {
      width: 450,
      height: 800,
    },
    inputs: [
      {
        type: "text",
        label: "TITULO DO JOGO",
        id: "insta-titulo-comp",
        x: 1040,
        y: 600,
        color: "red",
        font: "35pt BebasNeue",
        textAlign: "right",
      },
      {
        type: "text",
        label: "HORA",
        id: "insta-hora",
        x: 425,
        y: 1420,
        color: "white",
        font: "60pt Addictive",
        textAlign: "start",
      },
      {
        type: "text",
        label: "TWITCH",
        id: "insta-twitch",
        x: 565,
        y: 1585,
        color: "white",
        font: "45pt BebasNeue",
        textAlign: "center",
      },
      {
        type: "file",
        label: "EQUIPA 1",
        id: "insta-equipa-1",
        x: 205,
        y: 893,
        width: 160,
        height: 160,
      },
      {
        type: "file",
        label: "EQUIPA 2",
        id: "insta-equipa-2",
        x: 692,
        y: 893,
        width: 160,
        height: 160,
      },
      {
        type: "file",
        label: "CAMPEONATO LOGO",
        id: "insta-camp",
        x: 830,
        y: 450,
      },
    ],
  },
  TWITTER: {
    file: "./resources/twitter.png",
    width: 1920,
    height: 1080,
    fontBase: "35pt BebasNeue, Addictive",
    preview: {
      width: 800,
      height: 450,
    },
    inputs: [
      {
        type: "text",
        label: "TITULO DO JOGO",
        id: "twitter-titulo-comp",
        x: 1520,
        y: 300,
        color: "red",
        font: "35pt BebasNeue",
        textAlign: "right",
      },
      {
        type: "file",
        label: "EQUIPA 1",
        id: "twitter-equipa-1",
        x: 558,
        y: 623,
        width: 200,
        height: 200,
      },
      {
        type: "file",
        label: "EQUIPA 2",
        id: "twitter-equipa-2",
        x: 1150,
        y: 623,
        width: 200,
        height: 200,
      },
      {
        type: "file",
        label: "CAMPEONATO LOGO",
        id: "twitter-camp",
        x: 1310,
        y: 150,
      },
    ],
  },
  TEAM_PRO_INSTA: {
    file: "./resources/equipa_pro_insta.png",
    width: 1080,
    height: 1920,
    fontBase: "35pt BebasNeue, Addictive",
    preview: {
      width: 450,
      height: 800,
    },
    inputs: [
      {
        type: "text",
        label: "TITULO DO JOGO",
        id: "TEAM_PRO_INSTA-titulo-comp",
        x: 1050,
        y: 210,
        color: "red",
        font: "35pt BebasNeue",
        textAlign: "right",
      },
      {
        type: "text",
        label: "HORA",
        id: "TEAM_PRO_INSTA-hora",
        x: 740,
        y: 938,
        color: "white",
        font: "60pt Addictive",
        textAlign: "center",
      },
      {
        type: "text",
        label: "TWITCH",
        id: "TEAM_PRO_INSTA-twitch",
        x: 790,
        y: 1100,
        color: "white",
        font: "45pt BebasNeue",
        textAlign: "center",
      },
      {
        type: "file",
        label: "EQUIPA 1",
        id: "TEAM_PRO_INSTA-equipa-1",
        x: 213,
        y: 487,
        width: 170,
        height: 170,
      },
      {
        type: "file",
        label: "EQUIPA 2",
        id: "TEAM_PRO_INSTA-equipa-2",
        x: 693,
        y: 487,
        width: 170,
        height: 170,
      },
      {
        type: "file",
        label: "CAMPEONATO LOGO",
        id: "TEAM_PRO_INSTA-camp",
        x: 843,
        y: 95,
      },
    ],
  },
  TEAM_PRO_TWITTER: {
    file: "./resources/equipa_pro_twitter.png",
    width: 1920,
    height: 1080,
    fontBase: "35pt BebasNeue, Addictive",
    preview: {
      width: 800,
      height: 450,
    },
    inputs: [
      {
        type: "text",
        label: "TITULO DO JOGO",
        id: "TEAM_PRO_TWITTER-titulo-comp",
        x: 1880,
        y: 320,
        color: "red",
        font: "35pt BebasNeue",
        textAlign: "right",
      },
      {
        type: "file",
        label: "EQUIPA 1",
        id: "TEAM_PRO_TWITTER-equipa-1",
        x: 920,
        y: 650,
        width: 200,
        height: 200,
      },
      {
        type: "file",
        label: "EQUIPA 2",
        id: "TEAM_PRO_TWITTER-equipa-2",
        x: 1512,
        y: 650,
        width: 200,
        height: 200,
      },
      {
        type: "file",
        label: "CAMPEONATO LOGO",
        id: "TEAM_PRO_TWITTER-camp",
        x: 1680,
        y: 180,
      },
    ],
  },
};

function onBannerTypeSelectChange(e) {
  let bannerMapped = BANNER_MAPED[BANNER_TYPE_REF.value.toUpperCase()];
  FORM_BANNER_REF.textContent = "";
  if (bannerMapped) {
    drawImage(bannerMapped, null);
    drawForm(bannerMapped);
  }
}

function drawForm(bannerMapped) {
  if (!bannerMapped || !bannerMapped.inputs) {
    alert("Invalid Banner mapped");
  }

  bannerMapped.inputs.forEach((input) => {
    var master = document.createElement("div");
    master.classList.add("form-group");

    var label = document.createElement("label");
    label.textContent = input.label;

    var inputElement = document.createElement("input");
    inputElement.classList.add("form-control");
    inputElement.type = input.type;
    inputElement.id = input.id;

    inputElement.addEventListener("change", function (e) {
      if (input.type == "text") {
        STATE[input.id] = e.target.value;
        drawImage(bannerMapped, STATE);
      }

      if (input.type == "file") {
        var tempImage = new Image();
        tempImage.src = URL.createObjectURL(e.target.files[0]);
        STATE[input.id] = tempImage;

        tempImage.onload = function () {
          drawImage(bannerMapped, STATE);
        };
      }
    });

    master.appendChild(label);
    master.appendChild(inputElement);

    FORM_BANNER_REF.appendChild(master);
  });
}

function previewImg(banner) {
  IMAGE_PREVIEW_REF.src = CANVAS_REF.toDataURL();
  IMAGE_PREVIEW_REF.width = banner.preview.width;
  IMAGE_PREVIEW_REF.height = banner.preview.height;
}

function drawImage(banner, information) {
  CANVAS_REF.width = banner.width;
  CANVAS_REF.height = banner.height;
  var context = CANVAS_REF.getContext("2d");
  var imageObj = new Image();
  imageObj.src = banner.file;

  imageObj.onload = function () {
    context.drawImage(imageObj, 0, 0);
    context.font = banner.fontBase;

    if (information !== null) {
      banner.inputs.forEach((input) => {
        if (input.type === "text" && information[input.id]) {
          context.font = input.font;
          context.fillStyle = input.color;
          context.textAlign = input.textAlign;
          context.fillText(information[input.id], input.x, input.y);
        }

        if (input.type === "file" && information[input.id]) {
          if (input.width && input.height) {
            context.drawImage(
              information[input.id],
              input.x,
              input.y,
              input.width,
              input.height
            );
          } else {
            context.drawImage(information[input.id], input.x, input.y);
          }
        }
      });
    }
    previewImg(banner);
  };
}

function download_image() {
  image = CANVAS_REF.toDataURL("image/png").replace(
    "image/png",
    "image/octet-stream"
  );
  var link = document.createElement("a");
  link.download = "BANNER_AGENCY.png";
  link.href = image;
  link.click();
}
