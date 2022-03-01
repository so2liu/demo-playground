import RxJsDemoComponent from "./components/rxjs/RxJsDemo.component";
import { Tabs, TabPane } from "@douyinfe/semi-ui";
import { ChakraProvider } from "@chakra-ui/react";

enum TabKey {
    RxJsDemo = "RxJsDemo",
}
function App() {
    return (
        <ChakraProvider>
            <Tabs type="button">
                <TabPane tab="RxJsDemo" itemKey={TabKey.RxJsDemo}>
                    <RxJsDemoComponent />
                </TabPane>
            </Tabs>
        </ChakraProvider>
    );
}
export default App;
