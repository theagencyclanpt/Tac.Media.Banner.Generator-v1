const BANNER_TYPE_REF = document.getElementById("bannerType");
const IMAGE_PREVIEW_REF = document.getElementById("preview_image");
const CANVAS_REF = document.getElementById("preview_canvas");
const FORM_BANNER_REF = document.getElementById("dynamic_form");
const FORM_OPTIONS_REF = document.getElementById("dynamic_form_options");
let bannerMapped = null;

let STATE = {
  HAS_STREAM: false,
  OVERRIDE: {},
};

const BANNER_MAPED = {
  INSTA: {
    file: "./static/resources/banners/insta.normal.png",
    width: 1080,
    height: 1920,
    fontBase: "35pt BebasNeue, Addictive",
    preview: {
      width: 450,
      height: 800,
    },
    options: [
      {
        label: "Tem stream?",
        templateOverride: "./static/resources/banners/insta.twitch.png",
        id: "HAS_STREAM",
      },
    ],
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
        dependency: "HAS_STREAM",
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
        label: "CAMPEONATO LOGO (height 100px)",
        id: "insta-camp",
        x: 830,
        y: 450,
        "max-height": 100,
      },
    ],
  },
  TWITTER: {
    file: "./static/resources/banners/twitter.png",
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
        label: "CAMPEONATO LOGO (height 100px)",
        id: "twitter-camp",
        x: 1310,
        y: 150,
        "max-height": 100,
      },
    ],
  },
  TEAM_PRO_INSTA: {
    file: "./static/resources/banners/team.pro.insta.normal.png",
    width: 1080,
    height: 1920,
    fontBase: "35pt BebasNeue, Addictive",
    options: [
      {
        label: "Tem stream?",
        templateOverride:
          "./static/resources/banners/team.pro.insta.twitch.png",
        id: "HAS_STREAM",
      },
    ],
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
        dependency: "HAS_STREAM",
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
        label: "CAMPEONATO LOGO (height 100px)",
        id: "TEAM_PRO_INSTA-camp",
        x: 843,
        y: 95,
        "max-height": 100,
      },
    ],
  },
  TEAM_PRO_TWITTER: {
    file: "./static/resources/banners/team.pro.twitter.normal.png",
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
        label: "CAMPEONATO LOGO (height 100px)",
        id: "TEAM_PRO_TWITTER-camp",
        x: 1680,
        y: 180,
        "max-height": 100,
      },
    ],
  },
};

function onBannerTypeSelectChange(e) {
  bannerMapped = BANNER_MAPED[BANNER_TYPE_REF.value.toUpperCase()];
  FORM_OPTIONS_REF.textContent = "";
  STATE = { HAS_STREAM: false, OVERRIDE: {} };
  if (bannerMapped) {
    drawImage(null);
    drawForm();
  }
}

function renderDynamicFormInputs() {
  FORM_BANNER_REF.textContent = "";
  bannerMapped.inputs.forEach((input) => {
    console.log("RENDERING INPUT FORM -> " + input.label);

    if (input.dependency && !STATE[input.dependency]) {
      return;
    }

    var master = document.createElement("div");
    master.classList.add("form-group");

    var label = document.createElement("label");
    label.textContent = input.label;

    var inputElement = document.createElement("input");
    inputElement.type = input.type;
    inputElement.id = input.id;

    if (input.type === "text") {
      inputElement.classList.add("form-control");
      inputElement.value = STATE[input.id] ? STATE[input.id] : "";
      inputElement.oninput = function (e) {
        STATE[input.id] = e.target.value;
        drawImage(STATE);
      };
    }

    if (input.type === "file") {
      inputElement.classList.add("form-control");
      inputElement.onchange = function (e) {
        let tempImage = new Image();
        tempImage.src = URL.createObjectURL(e.target.files[0]);
        tempImage.onload = function () {
          if (input["max-height"] && tempImage.height > input["max-height"]) {
            alert("A imagem do campeonato só deve ter 100px de altura");
            inputElement.value = "";
            return;
          }

          STATE[input.id] = tempImage;
          drawImage(STATE);
        };
      };
    }

    master.appendChild(label);
    master.appendChild(inputElement);

    FORM_BANNER_REF.appendChild(master);
  });
}

function drawForm() {
  if (!bannerMapped || !bannerMapped.inputs) {
    alert("Invalid bannerMapped mapped");
  }

  renderDynamicFormInputs();

  bannerMapped.options.forEach((option) => {
    var master = document.createElement("div");
    master.classList.add("form-group");

    var label = document.createElement("label");
    label.textContent = option.label;

    var inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = option.id;

    inputElement.onchange = function (e) {
      if (inputElement.checked) {
        STATE[option.id] = true;
        STATE.OVERRIDE["bannerUrl"] = option.templateOverride;
        drawImage(STATE);
      } else {
        STATE[option.id] = false;
        STATE.OVERRIDE["bannerUrl"] = null;
        drawImage(STATE);
      }

      renderDynamicFormInputs();
    };

    master.appendChild(label);
    master.appendChild(inputElement);

    FORM_OPTIONS_REF.appendChild(master);
  });
}

function previewImg() {
  IMAGE_PREVIEW_REF.src = CANVAS_REF.toDataURL();
  IMAGE_PREVIEW_REF.width = bannerMapped.preview.width;
  IMAGE_PREVIEW_REF.height = bannerMapped.preview.height;
}

function drawImage() {
  CANVAS_REF.width = bannerMapped.width;
  CANVAS_REF.height = bannerMapped.height;

  var context = CANVAS_REF.getContext("2d");
  var imageObj = new Image();

  if (STATE.OVERRIDE["bannerUrl"]) {
    imageObj.src = STATE.OVERRIDE["bannerUrl"];
  } else {
    imageObj.src = bannerMapped.file;
  }

  imageObj.onload = function () {
    context.drawImage(imageObj, 0, 0);
    context.font = bannerMapped.fontBase;

    if (STATE !== null) {
      bannerMapped.inputs.forEach((input) => {
        if (input.type === "text" && STATE[input.id]) {
          if (input.dependency && !STATE[input.dependency]) {
            return;
          }

          context.font = input.font;
          context.fillStyle = input.color;
          context.textAlign = input.textAlign;
          context.fillText(STATE[input.id], input.x, input.y);
        }

        if (input.type === "file" && STATE[input.id]) {
          if (input.width && input.height) {
            context.drawImage(
              STATE[input.id],
              input.x,
              input.y,
              input.width,
              input.height
            );
          } else {
            context.drawImage(STATE[input.id], input.x, input.y);
          }
        }
      });
    }
    previewImg();
  };
}

function download_image() {
  let image = CANVAS_REF.toDataURL("image/jpeg", 1);

  var link = document.createElement("a");
  link.download = "BANNER_AGENCY.jpeg";
  link.href = image;

  link.click();
}

function publish_insta() {
  let image64 = CANVAS_REF.toDataURL("image/jpeg", 1);

  fetch("/publish-insta", {
    method: "POST",
    headers: { "Content-type": "application/json;charset=UTF-8" },
    body: JSON.stringify({ image: image64 }),
  }).then((response) => response.json());
}

onBannerTypeSelectChange({ value: "INSTA" });
