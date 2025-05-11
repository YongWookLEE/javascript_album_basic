const API_URL = "https://animal-api-two.vercel.app/";
const $content = document.querySelector("div.content");

const AlbumService = {
  init: async () => {
    AlbumService.eventHandler();
    await AlbumService.getData();
  },

  eventHandler: () => {
    // 탭이 추가될 수 있으니 이벤트 위임 방식을 사용
    const $tabBar = document.querySelector("div.tab-bar");

    $tabBar.addEventListener("click", (e) => {
      if (e.target.classList.contains("kind-tab")) {
        [...e.currentTarget.children].forEach((each) =>
          each.classList.remove("clicked")
        );
        e.target.classList.add("clicked");

        let kind = e.target.dataset.value;
        AlbumService.getData(kind);
      }
    });
  },

  getData: async (kind) => {
    let cur_url = kind ? API_URL + kind : API_URL;
    let res = await fetch(cur_url);
    let template = [];

    try {
      if (res) {
        let data = await res.json();
        data.photos.forEach((e) => {
          let imgTag = `<img src=${e.url}></img>`;
          // let $img = document.createElement("img");
          // $img.src = e.url;
          template.push(imgTag);
        });

        $content.innerHTML = template;
      }
    } catch (err) {
      console.log(err);
    }
  },
};
