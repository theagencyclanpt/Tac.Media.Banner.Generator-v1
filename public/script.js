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
