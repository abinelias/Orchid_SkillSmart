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
    public class PrerequisiteController : ApiController
    {
        /// <summary>
        /// To get all categories by parentId
        /// </summary>
        /// <returns>Category Object</returns>
        public IEnumerable<Prerequisite> GetAll(string parentId)
        {
            return ServiceFactory.GetPrerequisite().GetAllPrerequisiteById(parentId);
        }

        /// <summary>
        /// To get a Category details by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Category Object</returns>
        public Prerequisite Get(string id)
        {
            return ServiceFactory.GetPrerequisite().GetById(id);
        }

        /// <summary>
        /// To create a category 
        /// </summary>
        /// <param name="categoryObj">Category Object</param>
        public void Post(Prerequisite categoryObj)
        {
            try
            {
                ServiceFactory.GetPrerequisite().Create(categoryObj);
            }
            catch (Exception ex){}
        }

        /// <summary>
        /// To Update a category
        /// </summary>
        /// <param name="id">CategoryId</param>
        /// <param name="categoryObj">category Object</param>
        public void Put(string id, Prerequisite categoryObj)
        {
            try
            {
                categoryObj.Id = new Guid(id);
                ServiceFactory.GetPrerequisite().Update(categoryObj);
            }
            catch (Exception exp){}
        }

        /// <summary>
        /// To delete a category
        /// </summary>
        /// <param name="id">CategoryId</param>
        public void Delete(string id)
        {
            IPrerequisiteService<Prerequisite> jobSeekerService = ServiceFactory.GetPrerequisite();
            var jobSeeker = jobSeekerService.GetById(id);
            jobSeekerService.Delete(jobSeeker);  
        }

        public HttpResponseMessage Options()
        {
            var response = new HttpResponseMessage();
            response.StatusCode = HttpStatusCode.OK;
            return response;
        }
    }
}