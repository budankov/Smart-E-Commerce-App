import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import AppText from "../texts/AppText";
import AppButton from "../buttons/AppButton";
import { s, vs } from "react-native-size-matters";
import RadioWithTitle from "../inputs/RadioWithTitle";
import { languagesArr } from "../../localization/languagesList";
import i18n from "../../localization/i18n";
import { useTranslation } from "react-i18next";

const LanguageBottomSheet = () => {
  const [selectedLang, setSelectedLang] = useState(i18n.language);

  const { t } = useTranslation();

  const onLanguagePress = (code: string) => {
    setSelectedLang(code);
  };

  const handleConfirm = () => {
    SheetManager.hide("LANG_SHEET");
    i18n.changeLanguage(selectedLang);
  };

  return (
    <ActionSheet id="LANG_SHEET">
      <View style={styles.container}>
        <AppText style={{ marginBottom: vs(20), textAlign: "center" }}>
          {t("language_change_title")}
        </AppText>

        {languagesArr.map((lang) => (
          <RadioWithTitle
            key={lang.code}
            title={lang.label}
            selected={selectedLang === lang.code}
            onPress={() => onLanguagePress(lang.code)}
          />
        ))}

        <AppButton title={t("confirm_button")} onPress={handleConfirm} />
      </View>
    </ActionSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: s(16),
  },
});

export default LanguageBottomSheet;
