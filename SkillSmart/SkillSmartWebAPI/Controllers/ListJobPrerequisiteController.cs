﻿using SkillSmart.Base.Services;
using SkillSmart.Dto;
using SkillSmartData.Factory;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;
namespace SkillSmartWebAPI.Controllers
{
    public class ListJobPrerequisiteController : ApiController
    {

        public IEnumerable<SkillSmart.Dto.ListJobPrerequisite> GetAll()
        {
            var jobId = "";
            var alljobPrerequisite = ServiceFactory.GetJobPrerequisite().GetAll(jobId);
            var allPrerequisiteList = ServiceFactory.GetPrerequisite().GetAllPrerequisite();


            List<SkillSmart.Dto.ListJobPrerequisite> jobPrerequisiteList = new List<SkillSmart.Dto.ListJobPrerequisite>();
            foreach (JobPrerequisite jobPrerequisite in alljobPrerequisite)
            {
                foreach (Prerequisite prerequisite in allPrerequisiteList)
                {
                    if (jobPrerequisite.PrerequisiteTypeId == prerequisite.Id.ToString())
                    {
                        var prerequisiteId = prerequisite.Id.ToString();
                        var prerequisiteName = prerequisite.PrerequisiteName;

                        SkillSmart.Dto.ListJobPrerequisite jobPrerequisiteObj = new SkillSmart.Dto.ListJobPrerequisite();

                        jobPrerequisiteObj.PrerequisiteId = prerequisiteId;
                        jobPrerequisiteObj.PrerequisiteName = prerequisiteName;
                        jobPrerequisiteObj.JobId = jobPrerequisite.JobId;
                        jobPrerequisiteList.Add(jobPrerequisiteObj);
                        break;
                    }
                }
            }
            return jobPrerequisiteList;
        }

        public HttpResponseMessage Options()
        {
            var response = new HttpResponseMessage();
            response.StatusCode = HttpStatusCode.OK;
            return response;
        }
    }
}