using System;
using System.Collections.Generic;
using System.Linq;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using SkillSmart.Base.Services;
using SkillSmart.Utilities;
using System.Collections.Generic;
using MongoDB.Driver.Linq;
namespace SkillSmartMongoDA.Services
{
    using Entities;
    public class SpecialityCourseService : EntityService<SpecialityCourse>, ISpecialityCourseService<SkillSmart.Dto.SpecialityCourse>
    {
        public SpecialityCourseService(MongoDatabase mongoDatabase)
            : base(mongoDatabase)
        { }

        /// <summary>
        /// Function to get all speciality course
        /// </summary>
        /// <param name="id">EducationId</param>
        /// <returns>speciality course Object</returns>
        public IEnumerable<SkillSmart.Dto.SpecialityCourse> GetAllSpecialityCourseById(string id)
        {
            var jobSeekerSpecialityCourseList = this.MongoCollection.FindAllAs<SpecialityCourse>();

            List<SkillSmart.Dto.SpecialityCourse> jobSeekerSpecialityCourse = new List<SkillSmart.Dto.SpecialityCourse>();
            foreach (SpecialityCourse jobSeeker in jobSeekerSpecialityCourseList)
            {
                if (jobSeeker.JobSeekerId == id)
                {
                    SkillSmart.Dto.SpecialityCourse jobSeekerObj = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.SpecialityCourse, SkillSmart.Dto.SpecialityCourse>(jobSeeker);
                    jobSeekerSpecialityCourse.Add(jobSeekerObj);
                }
            }
            return jobSeekerSpecialityCourse;
        }

        /// <summary>
        /// Function to create a speciality course
        /// </summary>
        /// <param name="entity">speciality course Object</param>
        public void Create(SkillSmart.Dto.SpecialityCourse entity)
        {
            SpecialityCourse seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.SpecialityCourse, SkillSmartMongoDA.Entities.SpecialityCourse>(entity);
            base.Create(seeker);
            entity.Id = seeker.Id;
        }

        /// <summary>
        /// Function to get details of a speciality course
        /// </summary>
        /// <param name="id">specialitycourseId</param>
        /// <returns>speciality course Object</returns>
        public new SkillSmart.Dto.SpecialityCourse GetById(string id)
        {
            SpecialityCourse dbObj = base.GetById(id);
            SkillSmart.Dto.SpecialityCourse seeker = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.SpecialityCourse, SkillSmart.Dto.SpecialityCourse>(dbObj);
            return seeker;
        }

        /// <summary>
        /// Function to update speciality course
        /// </summary>
        /// <param name="entity">speciality course Object</param>
        public void Update(SkillSmart.Dto.SpecialityCourse entity)
        {
            SpecialityCourse seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.SpecialityCourse, SkillSmartMongoDA.Entities.SpecialityCourse>(entity);
            base.Update(seeker);         
        }

        /// <summary>
        /// Function to delete speciality course
        /// </summary>
        /// <param name="entity">speciality course Object</param>
        public void Delete(SkillSmart.Dto.SpecialityCourse entity)
        {
            SpecialityCourse seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.SpecialityCourse, SkillSmartMongoDA.Entities.SpecialityCourse>(entity);
            base.Delete(seeker);
        }
    }
}
