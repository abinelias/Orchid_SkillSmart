using SkillSmart.Base.Services;
using SkillSmart.Dto;
using SkillSmartData.Factory;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;
namespace SkillSmartWebAPI.Controllers
{
    public class LookupController : ApiController
    {
        /// <summary>
        /// To get all collection of anylookup
        /// </summary>
        /// <returns>list of lookup collections</returns>
        public IEnumerable<LookupDto> GetAll()
        {
            return ServiceFactory.GetLookupService("Country").GetAll();
        }

        /// <summary>
        /// to createlookup collection
        /// </summary>
        /// <param name="lookupObj">lookup object</param>
        public void Post(LookupDto lookupObj)
        {
            try
            {
                ServiceFactory.GetLookupService("Country").Create(lookupObj);
            }
            catch (Exception ex) { }
        }
    }
}
