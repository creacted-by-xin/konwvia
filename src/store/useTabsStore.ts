import { create } from 'zustand';
import type {DocumentType} from '../types/domain'

interface tabQuery {
    name?: string,
    type?: string,
    docStatus?: DocumentType['status'],
    startTime?: string,
    endTime?: string,
}

interface Tab {
    key: string,
    label: string,
    path: string;
    closable: boolean;
};

interface useTabsStoreType {
    tabs: Tab[],
    active: string,
    addTab: (tab: Tab) => void,
    removeTab: (key: string) => void,
    setActive: (key: string) => void,
    closeOtherTabs: () => void, // 关闭除“默认首页标签”和“当前激活标签”以外的所有标签。
    resetTabs: () => void,
    querys: Record<string, tabQuery>,
    setDetailQuery: (key: string, querys: tabQuery) => void,
}

const defaultTabs: Tab[] = [{
    key: "home",
    label: "知识库列表",
    path: "/",
    closable: false
}];

export const useTabsStore = create<useTabsStoreType>((set, get) => ({
    tabs: defaultTabs,
    active: 'home',

    addTab: (tab: Tab) => {
        const exist = get().tabs.find((t: Tab) => t.key === tab.key);

        if (!exist) {
            set({
                tabs: [...get().tabs, tab]
            })
        };

        set({ active: tab.key })
    },

    removeTab: (key: string) => {
        set(state => {
            const querys = { ...state.querys };
            delete querys[key];

            return {
                tabs: state.tabs.filter((t: Tab) => t.key !== key),
                querys
            }
        })
    },

    setActive: (key: string) => {
        set({
            active: key
        })
    },

    closeOtherTabs: () => {
        set(state=> {
            // 保留首页和当前标签
            const tabs = state.tabs.filter(
                tab=> tab.key === 'home' || tab.key === state.active
            );

            // 创建一个对象，保存需要保留tbs页的查询条件
            const savingQuery: Record<string, tabQuery> = {};

            //对应页签和查询条件
            for(const tab of tabs){
                // 拿到查询条件
                const query = state.querys[tab.key];

                if(query !== undefined){
                    savingQuery[tab.key] = query;
                }
            };

            return {
                tabs,
                active: tabs.some(tab=> tab.key === state.active)? state.active : 'home',
                querys: savingQuery
            }
        })
    },

    resetTabs: () => {
        set({
            tabs: defaultTabs,
            active: 'home',
            querys: {}
        })
    },

    querys: {},

    setDetailQuery: (key: string, querys: tabQuery) => {
        set(state => (
            {
                querys: {
                    ...state.querys,
                    [key]: querys
                }
            }
        ))
    }
}))


