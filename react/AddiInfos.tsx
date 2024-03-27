import React, { useEffect, useState } from 'react'
import { useProduct } from 'vtex.product-context';
import { Helmet } from "vtex.render-runtime";

function AddiInfos() {

  const productContext = useProduct();

  const [AppSettingsResponse, setAppSettingsResponse]: any = useState(null);
  const [customData, setCustomData]: any = useState({
    style: null,
    sourceUrl: null,
    locatedBrazil: null,
    price: null,
    allySlug: null
  });
  const [price, setPrice] = useState(0);

  useEffect(() => {
    console.log("script addi-v2 loading....")
    const selectedItem = productContext?.selectedItem
    const seller: any = selectedItem?.sellers[0]

    setPrice(seller?.commertialOffer.Price);
    if (price) {
      setAppSettingsResponse({})//reset states
      setAppSettingsResponse(window?.localStorage?.getItem("@settingsAppAddi"));
    }

  }, [productContext])

  useEffect(() => {

    if (!AppSettingsResponse) return

    const appSettingsParse = JSON.parse(decodeURIComponent(AppSettingsResponse))

    const {
      allySlug,
      widgetBorderColor,
      widgetBorderRadius,
      widgetFontColor,
      widgetFontFamily,
      widgetFontSize,
      widgetBadgeBackgroundColor,
      widgetInfoBackgroundColor,
      widgetMargin,
      locatedBrazil,
      modalBackgroundColor,
      modalFontColor,
      modalPriceColor,
      modalBadgeBackgroundColor,
      modalBadgeBorderRadius,
      modalBadgeFontColor,
      modalCardColor,
      modalButtonBorderColor,
      modalButtonBorderRadius,
      modalButtonBackgroundColor,
      modalButtonFontColor,
    }: any = appSettingsParse;

    console.log({
      allySlug,
      widgetBorderColor,
      widgetBorderRadius,
      widgetFontColor,
      widgetFontFamily,
      widgetFontSize,
      widgetBadgeBackgroundColor,
      widgetInfoBackgroundColor,
      widgetMargin,
      locatedBrazil,
      modalBackgroundColor,
      modalFontColor,
      modalPriceColor,
      modalBadgeBackgroundColor,
      modalBadgeBorderRadius,
      modalBadgeFontColor,
      modalCardColor,
      modalButtonBorderColor,
      modalButtonBorderRadius,
      modalButtonBackgroundColor,
      modalButtonFontColor,
    })


    if (price) {

      const WIDGET_CUSTOM_STYLES = {
        borderColor: widgetBorderColor,
        borderRadius: widgetBorderRadius,
        fontColor: widgetFontColor,
        fontFamily: widgetFontFamily,
        fontSize: widgetFontSize,
        badgeBackgroundColor: widgetBadgeBackgroundColor,
        infoBackgroundColor: widgetInfoBackgroundColor,
        margin: widgetMargin
      }

      const MODAL_CUSTOM_STYLES = {
        backgroundColor: modalBackgroundColor,
        fontColor: modalFontColor,
        fontFamily: widgetFontFamily,
        priceColor: modalPriceColor,
        badgeBackgroundColor: modalBadgeBackgroundColor,
        badgeFontColor: modalBadgeFontColor,
        badgeBorderRadius: modalBadgeBorderRadius,
        cardColor: modalCardColor,
        buttonBorderColor: modalButtonBorderColor,
        buttonBorderRadius: modalButtonBorderRadius,
        buttonBackgroundColor: modalButtonBackgroundColor,
        buttonFontColor: modalButtonFontColor
      }

      function getCustomizableWidgetStyles() {

        const getStylesProperties = (Obj: any) => {
          const objKeys = Object.keys(Obj);
          const newObject: any = {};

          for (let i = 0; i < Object.keys(Obj).length; i++) {
            if (!!Obj[objKeys[i]]) {
              newObject[objKeys[i]] = Obj[objKeys[i]].replace("%23", "#") //remove hash in convert json
            }
          }

          return newObject;
        }

        return JSON.stringify({
          widget: getStylesProperties(WIDGET_CUSTOM_STYLES),
          modal: getStylesProperties(MODAL_CUSTOM_STYLES)
        });

      }

      const data = getCustomizableWidgetStyles();

      setCustomData(data)

      setCustomData({
        sourceUrl: `https://s3.amazonaws.com/widgets.addi.com/bundle.min.js`,
        locatedBrazil: locatedBrazil,
        style: data,
        allySlug: allySlug,
        price: price
      })

    }


    /* @ts-ignore */
  }, [AppSettingsResponse])

  return (
    <div>

      <Helmet>
        <script src={customData?.sourceUrl} ></script>
      </Helmet>

      {
        customData && (
          /* @ts-ignore */
          customData?.locatedBrazil == "br" ? (<addi-widget-br price={customData?.price} ally-slug={customData?.allySlug} custom-widget-styles={customData?.style} ></addi-widget-br>)
            /* @ts-ignore */
            : (<addi-widget price={price} ally-slug={customData?.allySlug} custom-widget-styles={customData?.style} ></addi-widget>)
        )

      }

    </div>
  )
}

export default AddiInfos
