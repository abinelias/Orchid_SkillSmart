using MongoDB.Driver;
using MongoDB.Driver.Builders;
using SkillSmart.Base.Services;
using SkillSmart.Utilities;
using System.Collections.Generic;
namespace SkillSmartMongoDA.Services
{
    using Entities;
    public class JobPermissionService : EntityService<JobPermission>, IJobPermissionService<SkillSmart.Dto.JobPermission>
    {
        public JobPermissionService(MongoDatabase mongoDatabase)
            : base(mongoDatabase)
        { }


        /// <summary>
        /// Function to get all jobseeker details
        /// </summary>
        /// <returns>List of jobseekers</returns>
        public IEnumerable<SkillSmart.Dto.JobPermission> GetAllJobsPermission(string employerId)
        {
            var jobPermissionList = this.MongoCollection.FindAllAs<JobPermission>(); //get all jobseekers

            //Creating jobseeker object jobSeekerCursor
            List<SkillSmart.Dto.JobPermission> jobPermissionEmployer = new List<SkillSmart.Dto.JobPermission>();
            foreach (JobPermission employer in jobPermissionList)
            {
                if (employer.EmployerId == employerId)
                {
                    SkillSmart.Dto.JobPermission employerObj = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.JobPermission, SkillSmart.Dto.JobPermission>(employer);
                    jobPermissionEmployer.Add(employerObj);
                }
            }
            return jobPermissionEmployer;
        }

        
        /// <summary>
        /// Function to create a jobseeker
        /// </summary>
        /// <param name="entity">jobseeker object</param>
        public void Create(SkillSmart.Dto.JobPermission entity)
        {
            SkillSmartMongoDA.Entities.JobPermission seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.JobPermission, SkillSmartMongoDA.Entities.JobPermission>(entity);
            base.Create(seeker);
            entity.Id = seeker.Id;
        }


        public new SkillSmart.Dto.JobPermission GetById(string id)
        {
            JobPermission dbObj = base.GetById(id);
            SkillSmart.Dto.JobPermission seeker = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.JobPermission, SkillSmart.Dto.JobPermission>(dbObj);
            return seeker;
        }


        public void Update(SkillSmart.Dto.JobPermission entity)
        {
                  
        }


        public void Delete(SkillSmart.Dto.JobPermission entity)
        {
           
        }

    }
}
