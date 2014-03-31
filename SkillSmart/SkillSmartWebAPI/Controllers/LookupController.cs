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
        public IEnumerable<LookupDto> GetAll(string name)
        {
            return ServiceFactory.GetLookupService(name).GetAll();
        }

        /// <summary>
        /// To get object by id
        /// </summary>
        /// <param name="name">Collection Name</param>
        /// <param name="id">Collection Id</param>
        /// <returns></returns>
        public LookupDto Get(string name, string id)
        {
            return ServiceFactory.GetLookupService(name).GetById(id);
        }

        /// <summary>
        /// to createlookup collection
        /// </summary>
        /// <param name="lookupObj">lookup object</param>
        public void Post(LookupDto lookupObj)
        {
            try
            {
                ServiceFactory.GetLookupService("SkillAcquired").Create(lookupObj);
            }
            catch (Exception ex) { }
        }
    }
}
