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
    public class SkillSupportingMaterialController : ApiController
    {

        /// <summary>
        /// To get all jobseeker work history
        /// </summary>
        /// <returns>List of all work history of jobseeker</returns>
        public IEnumerable<SkillSupportingMaterial> GetSkillSupportingMaterialById(String jobSeekerId)
        {
            return ServiceFactory.GetSkillSupportingMaterial().GetAllSupportingMaterial(jobSeekerId);
        }

        /// <summary>
        /// To get details of a particular work history of a jobseeker 
        /// </summary>
        /// <param name="id">workhistoryid</param>
        /// <returns>work history object</returns>
        public SkillSupportingMaterial Get(string id)
        {
            return ServiceFactory.GetSkillSupportingMaterial().GetById(id);
        }

        /// <summary>
        /// To create a new work history details
        /// </summary>
        /// <param name="jobSeekerWorkHistoryObj">WorkHistory object</param>
        public string Post(SkillSupportingMaterial jobSeekerSkillSupportingMaterialObj)
        {

            ServiceFactory.GetSkillSupportingMaterial().Create(jobSeekerSkillSupportingMaterialObj);
            return jobSeekerSkillSupportingMaterialObj.Id.ToString();
        }

        /// <summary>
        /// To update work history details of the jobseeker
        /// </summary>
        /// <param name="id">WorkHistoryId</param>
        /// <param name="jobSeekerWorkHistoryObj">WorkHistoryObject</param>
        public void Put(string id, SkillSupportingMaterial jobSeekerSkillSupportingMaterialObj)
        {
            try
            {
                jobSeekerSkillSupportingMaterialObj.Id = new Guid(id);
                ServiceFactory.GetSkillSupportingMaterial().Update(jobSeekerSkillSupportingMaterialObj);
            }
            catch (Exception exp){}
        }

        /// <summary>
        /// To delete a particular work history details of the jobseeker
        /// </summary>
        /// <param name="id">WorkHistoryId</param>
        public void Delete(string id)
        {
            ISkillSupportingMaterial<SkillSupportingMaterial> jobSeekerSkillSupportingMaterialService = ServiceFactory.GetSkillSupportingMaterial();
            var jobSeekerWorkHistory = jobSeekerSkillSupportingMaterialService.GetById(id);
            jobSeekerSkillSupportingMaterialService.Delete(jobSeekerWorkHistory);  
        }

        public HttpResponseMessage Options()
        {
            var response = new HttpResponseMessage();
            response.StatusCode = HttpStatusCode.OK;
            return response;
        }
    }
}