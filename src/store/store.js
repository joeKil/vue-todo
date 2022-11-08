import {createStore} from 'vuex'

// 여기다가 로컬스토리지 관련된 동작들을 가져옴
const storage = {
    fetch() {
        const arr = [];
        // 라이프사이클 훅임. 생성되는 시점에 이 안에 로직이 호출 됨.
        if (localStorage.length > 0) {
            for (let i = 0; i < localStorage.length; i++) {
                // 로컬스토리지에서는 전체 데이터 가져오는 api를 제공하지 않음. 그래서 for문으로 가져옴
                if (localStorage.key(i) !== 'loglevel:webpack-dev-server') {
                    // 밸류에서 아이템으로 맞춰줘야 컴플리티드로 접근 가능 ( 선생님이 그렇게 설계함 )
                    arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
                    // this.todoItems.push(localStorage.key(i));
                    // 각각의 객체를 넣은 상황임.
                    //   this.todoItems.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
                }
            }
        }
        return arr;
        // 빈배열안에 집어넣고 리턴을 해줌. 로컬스토리지에 들고와서 배열에 담아주고 반환을 함.
    },
};

// 스토리지 객체를 state에서 호출할거기 때문에 store.fech라 하면 로컬스토리지에 있는 데이터를 다 담아와서 배열로 돌려줌


// 간단한 설치와 함께 vuex 등록까지 한 상황
export const store = createStore({
    state: {
        // 공통으로 가지는 데이터를 store로 뺌.
        todoItems: storage.fetch()
    }
})