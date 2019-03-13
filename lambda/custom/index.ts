import { SkillBuilders } from "ask-sdk-core";

import * as Intents from "./intents";
import * as Event from "./intents/Event";
import * as Pharmacy from "./intents/Pharmacy";
import * as Shop from "./intents/Shop";
import * as Gastronomy from "./intents/Gastronomy";
import * as Interceptor from "./interceptors";
import * as Errors from "./errors";

export const handler = SkillBuilders.custom()
  .addRequestHandlers(
    //Intents.Debug,

    // Default intents
    Intents.LaunchHandler,
    Intents.HelpHandler,
    Intents.StopHandler,
    Intents.SessionEndedHandler,

    Event.EventListHandler,
    // Event.EventDetailHandler,

    Pharmacy.PharmacyListHandler,
    Pharmacy.PharmacyDetailHandler,

    Shop.ShopListHandler,

    Gastronomy.GastronomyListHandler,

    Intents.LoadMoreHandler,
    Intents.FindMunicipalityHandler
  )
  .addRequestInterceptors(
    Interceptor.LocalizationInterceptor,
    Interceptor.Slots
  )
  .addErrorHandlers(
    Errors.Unknown,
    Errors.Unexpected
  )
  .lambda();