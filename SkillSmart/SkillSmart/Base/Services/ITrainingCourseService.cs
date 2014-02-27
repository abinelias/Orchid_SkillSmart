using SkillSmart.Base.Entities;
using System.Collections.Generic;
namespace SkillSmart.Base.Services
{
    public interface ITrainingCourseService<T> : IEntityService<T> where T : IEntity
    {

        IEnumerable<T> GetJobSeekerTrainingCourse(string id);

    }
}
