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

        public IEnumerable<SkillSmart.Dto.SpecialityCourse> GetAllSpecialityCourseById(string id)
        {
            var jobSeekerSpecialityCourseList = this.MongoCollection.FindAllAs<SpecialityCourse>();

            List<SkillSmart.Dto.SpecialityCourse> jobSeekerSpecialityCourse = new List<SkillSmart.Dto.SpecialityCourse>();
            foreach (SpecialityCourse jobSeeker in jobSeekerSpecialityCourseList)
            {
                if (jobSeeker.EducationId == id)
                {
                    SkillSmart.Dto.SpecialityCourse jobSeekerObj = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.SpecialityCourse, SkillSmart.Dto.SpecialityCourse>(jobSeeker);
                    jobSeekerSpecialityCourse.Add(jobSeekerObj);
                }
            }
            return jobSeekerSpecialityCourse;
        }

        public void Create(SkillSmart.Dto.SpecialityCourse entity)
        {
            SpecialityCourse seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.SpecialityCourse, SkillSmartMongoDA.Entities.SpecialityCourse>(entity);
            base.Create(seeker);
        }

        public new SkillSmart.Dto.SpecialityCourse GetById(string id)
        {
            SpecialityCourse dbObj = base.GetById(id);
            SkillSmart.Dto.SpecialityCourse seeker = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.SpecialityCourse, SkillSmart.Dto.SpecialityCourse>(dbObj);
            return seeker;
        }

        public void Update(SkillSmart.Dto.SpecialityCourse entity)
        {
            SpecialityCourse seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.SpecialityCourse, SkillSmartMongoDA.Entities.SpecialityCourse>(entity);
            base.Update(seeker);         
        }

        public void Delete(SkillSmart.Dto.SpecialityCourse entity)
        {
            SpecialityCourse seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.SpecialityCourse, SkillSmartMongoDA.Entities.SpecialityCourse>(entity);
            base.Delete(seeker);
        }
    }
}
