import styles from "./TabBar.module.css";

import { 
    AppBar, 
    Tab,
    Tabs,
} from "@material-ui/core";

import {
    Skeleton
} from "@material-ui/lab";

type Props = {
    labelList: string[];
    selectedTab: number;
    setSelectedTab: (value: number) => void;
    loading?: boolean;
}

function TabBar({ 
    labelList, 
    selectedTab,
    setSelectedTab,
    loading = false,
}: Props) {

    function handleTabChange(event: any, index: number) {
        setSelectedTab(index);
    }

    return (
        <AppBar elevation={0} position="static">
            <Tabs
                value={ selectedTab }
                onChange={ handleTabChange }
                className={ styles.tabBarContainer }
            >
                {loading && [...Array(3)].map((number, index) => (
                    <Tab 
                        key={index}
                        label={<Skeleton width={100} />}
                    />
                    
                ))}

                {!loading && labelList.map((label, index) => (
                    <Tab 
                        style={{ fontSize: "0.78rem" }}
                        key={index} 
                        label={label} 
                    />
                ))}
            </Tabs>
        </AppBar>
    )
};

export { TabBar };