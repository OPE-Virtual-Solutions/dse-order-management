import styles from "./TabBar.module.css";

import { 
    AppBar, 
    Tab,
    Tabs,
} from "@material-ui/core";

type Props = {
    labelList: string[];
    selectedTab: number;
    setSelectedTab: (value: number) => void;
}

function TabBar({ 
    labelList, 
    selectedTab,
    setSelectedTab,
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
                { labelList.map((label, index) => (
                    <Tab key={index} label={label} />
                ))}
            </Tabs>
        </AppBar>
    )
};

export { TabBar };