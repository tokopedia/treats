import { addLocaleData } from "@treats/intl";
import localeDataResolver from "@@BUILD_LOCALE_DATA_RESOLVER_PATH@@";

const loadLocaleData = lang =>
    localeDataResolver(lang).then(([intlData, messages]) => {
        addLocaleData(intlData.default);
        return messages;
    });

export default loadLocaleData;
