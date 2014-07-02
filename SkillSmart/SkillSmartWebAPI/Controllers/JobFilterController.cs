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
            var jobId = "";
            JobFilter filterObj = new JavaScriptSerializer().Deserialize<JobFilter>(filter);
            var alljobList = ServiceFactory.GetJobsList().GetAll(jobId);
            var alljobPrerequisite = ServiceFactory.GetJobPrerequisite().GetAll(jobId);
            var alljobSkills = ServiceFactory.GetJobSkills().GetAll(jobId);

            List<SkillSmart.Dto.JobsList> jobList = new List<SkillSmart.Dto.JobsList>();

            foreach (JobsList joblist in alljobList)
            {
                if (filterObj.Salary.Contains(joblist.JobSalary))
                {
                    if (filterObj.EmployeementType.Contains(joblist.JobType))
                    {
                        var company = ServiceFactory.GetCompany().GetById(joblist.CompanyId);
                        var industry = company.Industry;
                        if (filterObj.Industry.Contains(industry))
                        {
                           
                                        var maxSkillExp = 0;
                                        var expId = "";
                                        foreach (JobSkills jobSkill in alljobSkills)
                                        {
                                            if (jobSkill.JobId == joblist.Id.ToString())
                                            {
                                                if (jobSkill.SkillExperience > maxSkillExp)
                                                {
                                                    maxSkillExp = jobSkill.SkillExperience;
                                                }
                                            }
                                        }
                                        if (maxSkillExp >= 0 && maxSkillExp <= 3)
                                            expId = "b3aa14a9-2e9a-41cd-af36-50d015a6f51d";
                                        if (maxSkillExp >= 4 && maxSkillExp <= 6)
                                            expId = "a74861fe-07f1-4a39-a584-4e1df252e902";
                                        if (maxSkillExp >= 7 && maxSkillExp <= 12)
                                            expId = "e9549c38-56f3-4e3f-9ddf-f08ba43e771e";
                                        if (maxSkillExp >= 13)
                                            expId = "544f81f2-4076-41c9-9145-6d8a92a1fc9b";
                                        if (filterObj.CarrierLevel.Contains(expId))
                                        {
                                            jobList.Add(joblist);
                                        }
                        }
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