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
    public class OverviewController : ApiController
    {
        public Overview Get(string id)
        {
            return ServiceFactory.GetJobSeekerOverview().GetById(id);
        }

        public void Post(Overview jobSeekerObj)
        {
            try
            {
                ServiceFactory.GetJobSeekerOverview().Create(jobSeekerObj);
            }
            catch (Exception ex){}
        }

        public void Put(string id, Overview jobSeekerObj)
        {
            try
            {
                jobSeekerObj.Id = new Guid(id);
                ServiceFactory.GetJobSeekerOverview().Update(jobSeekerObj);
            }
            catch (Exception exp){}
        }

       
    }
}