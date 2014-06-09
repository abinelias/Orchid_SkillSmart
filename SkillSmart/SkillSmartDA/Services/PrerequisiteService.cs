using MongoDB.Driver;
using MongoDB.Driver.Builders;
using SkillSmart.Base.Services;
using SkillSmart.Utilities;
using System.Collections.Generic;
using MongoDB.Driver.Linq;
namespace SkillSmartMongoDA.Services
{
    using Entities;
    public class PrerequisiteService : EntityService<Prerequisite>, IPrerequisiteService<SkillSmart.Dto.Prerequisite>
    {
        public PrerequisiteService(MongoDatabase mongoDatabase)
            : base(mongoDatabase)
        { }

        /// <summary>
        /// Function to get all Category by parentId
        /// </summary>
        /// <param name="id">CategoryId</param>
        /// <returns>Category object</returns>
        public IEnumerable<SkillSmart.Dto.Prerequisite> GetAllPrerequisiteById(string id)
        {
            var prerequisiteList = this.MongoCollection.FindAllAs<Prerequisite>();

            List<SkillSmart.Dto.Prerequisite> prerequisite = new List<SkillSmart.Dto.Prerequisite>();
            foreach (Prerequisite jobSeeker in prerequisiteList)
            {
                if (jobSeeker.ParentId.ToString() == id)
                {
                    SkillSmart.Dto.Prerequisite jobSeekerObj = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.Prerequisite, SkillSmart.Dto.Prerequisite>(jobSeeker);
                    prerequisite.Add(jobSeekerObj);
                }
            }
            return prerequisite;
        }

        /// <summary>
        /// Function to get all Category
        /// </summary>
        /// <returns>Category object</returns>
        public IEnumerable<SkillSmart.Dto.Prerequisite> GetAllPrerequisite()
        {
            var prerequisiteList = this.MongoCollection.FindAllAs<Prerequisite>();

            List<SkillSmart.Dto.Prerequisite> prerequisite = new List<SkillSmart.Dto.Prerequisite>();
            foreach (Prerequisite jobSeeker in prerequisiteList)
            {
                SkillSmart.Dto.Prerequisite jobSeekerObj = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.Prerequisite, SkillSmart.Dto.Prerequisite>(jobSeeker);
                prerequisite.Add(jobSeekerObj);
            }
            return prerequisite;
        }


        /// <summary>
        /// Function to create a Category
        /// </summary>
        /// <param name="entity">Category object</param>
        public void Create(SkillSmart.Dto.Prerequisite entity)
        {
            Prerequisite seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.Prerequisite, SkillSmartMongoDA.Entities.Prerequisite>(entity);
            base.Create(seeker);
        }

        /// <summary>
        /// Function to get a Category details
        /// </summary>
        /// <param name="id">CategoryId</param>
        /// <returns>Category object</returns>
        public new SkillSmart.Dto.Prerequisite GetById(string id)
        {
            Prerequisite dbObj = base.GetById(id);
            SkillSmart.Dto.Prerequisite seeker = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.Prerequisite, SkillSmart.Dto.Prerequisite>(dbObj);
            return seeker;
        }

        /// <summary>
        /// Function to Update a Category
        /// </summary>
        /// <param name="entity">Category object</param>
        public void Update(SkillSmart.Dto.Prerequisite entity)
        {
            Prerequisite seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.Prerequisite, SkillSmartMongoDA.Entities.Prerequisite>(entity);
            base.Update(seeker);         
        }

        public void Delete(SkillSmart.Dto.Prerequisite entity)
        {
           
        }
    }
}
