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
    public class LookupByCriteriaController : ApiController
    {
        /// <summary>
        /// To get all collection of anylookup
        /// </summary>
        /// <returns>list of lookup collections</returns>
        public IEnumerable<LookupByCriteria> GetAll(string name, string parentId)
        {

            return ServiceFactory.GetLookupByCriteriaService(name).GetAll(parentId);
            
        }

        /// <summary>
        /// to create lookup collection
        /// </summary>
        /// <param name="lookupObj">lookup object</param>
        public void Post(LookupByCriteria lookupObj)
        {
            try
            {
                ServiceFactory.GetLookupByCriteriaService("State").Create(lookupObj);
            }
            catch (Exception ex) { }
        }
    }
}
