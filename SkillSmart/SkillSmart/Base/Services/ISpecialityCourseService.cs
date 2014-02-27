using SkillSmart.Base.Entities;
using System.Collections.Generic;
namespace SkillSmart.Base.Services
{
    public interface ISpecialityCourseService<T> : IEntityService<T> where T : IEntity
    {

        IEnumerable<T> GetAllSpecialityCourseById(string id);

    }
}
