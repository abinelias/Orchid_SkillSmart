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
        public IEnumerable<LookupDto> GetAll(string collectionName)
        {
            return ServiceFactory.GetLookupService(collectionName).GetAll();
        }

        public void Post(LookupDto jobSeekerObj)
        {
            try
            {
                ServiceFactory.GetLookupService("State").Create(jobSeekerObj);
            }
            catch (Exception ex) { }
        }
    }
}
