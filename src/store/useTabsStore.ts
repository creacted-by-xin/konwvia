import { create } from 'zustand';

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
    resetTabs: () => void,
}

export const useTabsStore = create<useTabsStoreType>((set, get) => ({
    tabs: [{
        key: "home",
        label: "知识库列表",
        path: "/",
        closable: false
    }],
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
        set({
            tabs: get().tabs.filter((t: Tab) => t.key !== key)
        })
    },
    setActive: (key: string) => {
        set({
            active: key
        })
    },
    resetTabs: () => {
        set({
            tabs: [{
                key: "home",
                label: "知识库列表",
                path: "/",
                closable: false
            }]
        })
    },
}))
