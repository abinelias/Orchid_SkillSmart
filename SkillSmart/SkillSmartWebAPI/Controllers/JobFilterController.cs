using SkillSmart.Base.Services;
using SkillSmart.Dto;
using SkillSmartData.Factory;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Web.Script.Serialization;
using System.Net;
using System.Net.Http;
using System.Web.Http;
namespace SkillSmartWebAPI.Controllers
{
    public class JobFilterController : ApiController
    {

        public IEnumerable<SkillSmart.Dto.JobsList> GetAll(string filter)
        {
            JobFilter filterObj = new JavaScriptSerializer().Deserialize<JobFilter>(filter);
            var alljobList = ServiceFactory.GetJobsList().GetAll();

            List<SkillSmart.Dto.JobsList> jobList = new List<SkillSmart.Dto.JobsList>();

            foreach (JobsList joblist in alljobList)
            {
                if (filterObj.Salary.Contains(joblist.JobSalary))
                {
                    var company = ServiceFactory.GetCompany().GetById(joblist.CompanyId);
                    var industry = company.Industry;
                    if (filterObj.Industry.Contains(industry))
                    {

                        jobList.Add(joblist);

                    }
                }
            }

            return jobList;
        }

        public HttpResponseMessage Options()
        {
            var response = new HttpResponseMessage();
            response.StatusCode = HttpStatusCode.OK;
            return response;
        }
    }
}