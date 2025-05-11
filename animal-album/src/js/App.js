import TabBar from "./components/TabBar.js";
import Content from "./components/Content.js";
import { request } from "./components/api.js";

export default function App($app) {
  this.state = {
    // A||B 왼쪽이 참이면 그 값을 반환, 왼쪽이 거짓이면 오른쪽 값을 반환
    currentTab: window.location.pathname.split("/").pop() || "all",
    photos: [],
  };

  const tabBar = new TabBar({
    $app,
    //초기상태를 나타냄
    initialState: "",
    // 버튼 클릭 이벤트
    onClick: async (name) => {
      //라우팅
      history.pushState(null, `${name} 사진`, name);
      this.updateContent(name);
    },
  });

  const content = new Content({
    $app,
    initialState: [],
  });

  this.setState = (newState) => {
    this.state = newState;
    tabBar.setState(this.state.currentTab);
    content.setState(this.state.photos);
  };

  this.updateContent = async (tabName) => {
    try {
      const currentTab = tabName === "all" ? "" : tabName;
      const photos = await request(currentTab);

      this.setState({
        ...this.state,
        currentTab: tabName,
        photos: photos,
      });
    } catch (err) {
      console.log(err);
    }
  };

  //window 이벤트중 'popstate'를 이용하면 history의 pushState값을 가져올 수 있다
  //history.back() ->뒤로가기, history.forward() -> 앞으로가기 할 때 상태값 가져오기 가능
  window.addEventListener("popstate", async () => {
    let tabName = window.location.pathname.split("/").pop();
    this.updateContent(tabName);
  });

  const init = async () => {
    this.updateContent(this.state.currentTab);
  };

  init();
}
