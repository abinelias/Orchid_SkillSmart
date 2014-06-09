using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Routing;

namespace SkillSmartWebAPI
{
  using App_Start;
  using Microsoft.Owin.Security.OAuth;
  public static class WebApiConfig
  {
    public static void Register(HttpConfiguration config)
    {
      // Web API configuration and services
      // Configure Web API to use only bearer token authentication.
      config.SuppressDefaultHostAuthentication();

      config.EnableCors(new System.Web.Http.Cors.EnableCorsAttribute("*", "*", "*"));

      config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));

      // Use camel case for JSON data.
      //config.Formatters.JsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();

      // Web API routes
      config.MapHttpAttributeRoutes();

      config.Routes.MapHttpRoute(
          name: "DefaultApi",
          routeTemplate: "api/{controller}/{id}",
          defaults: new { id = RouteParameter.Optional }
      );

      config.Filters.Add(new ExceptionHandlingAttribute());
      config.MessageHandlers.Add(new LoggingHandler());

      var json = config.Formatters.JsonFormatter;
      json.SerializerSettings.PreserveReferencesHandling = Newtonsoft.Json.PreserveReferencesHandling.Objects;
      config.Formatters.Remove(config.Formatters.XmlFormatter);


    }
  }
}
