import { create } from 'zustand';

interface tabQuery {
    name?: string,
    type?: string,
    status?: string,
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
        // get() 可以拿到当前 store 的最新状态，这里需要同时读取 tabs 和 active。
        const { tabs, active, querys } = get();
        // 根据 active key 找到当前正在查看的标签对象，后面要把它保留下来。
        const activeTab = tabs.find((tab: Tab) => tab.key === active);

        const activeQuery: Record<string, tabQuery> = {};
        

        set({
            // 保留默认首页标签；如果当前标签不是首页，则额外保留当前标签。
            // 例如：当前在 Chat 标签，点击“关闭其他标签”后，剩下 home + Chat。
            // 如果当前就在 home，点击后只需要剩下 home。
            tabs: activeTab && activeTab.key !== 'home'
                ? [...defaultTabs, activeTab]
                : defaultTabs,
            querys: activeTab && activeTab.key !== 'home' 
            ? { ...activeQuery, [activeTab.key]: querys[activeTab.key] } : {},
            // active 不变，是为了保证用户点击后仍停留在当前正在看的页面。
            active,

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


