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
    public class CategoryController : ApiController
    {
        /// <summary>
        /// To get all categories by parentId
        /// </summary>
        /// <returns>Category Object</returns>
        public IEnumerable<Category> GetAllCategoryById()
        {
            return ServiceFactory.GetCategory().GetAllCategoryById("cdc83674-95f4-460c-95e0-6ae04174f75e");
        }

        /// <summary>
        /// To get a Category details by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Category Object</returns>
        public Category Get(string id)
        {
            return ServiceFactory.GetCategory().GetById(id);
        }

        /// <summary>
        /// To create a category 
        /// </summary>
        /// <param name="categoryObj">Category Object</param>
        public void Post(Category categoryObj)
        {
            try
            {
                ServiceFactory.GetCategory().Create(categoryObj);
            }
            catch (Exception ex){}
        }

        /// <summary>
        /// To Update a category
        /// </summary>
        /// <param name="id">CategoryId</param>
        /// <param name="categoryObj">category Object</param>
        public void Put(string id, Category categoryObj)
        {
            try
            {
                categoryObj.Id = new Guid(id);
                ServiceFactory.GetCategory().Update(categoryObj);
            }
            catch (Exception exp){}
        }

        /// <summary>
        /// To delete a category
        /// </summary>
        /// <param name="id">CategoryId</param>
        public void Delete(string id)
        {
            ICategoryService<Category> jobSeekerService = ServiceFactory.GetCategory();
            var jobSeeker = jobSeekerService.GetById(id);
            jobSeekerService.Delete(jobSeeker);  
        }
    }
}