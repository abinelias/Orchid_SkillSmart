using SkillSmart.Base.Entities;
using System.Collections.Generic;
namespace SkillSmart.Base.Services
{
    public interface ICategoryService<T> : IEntityService<T> where T : IEntity
    {

        IEnumerable<T> GetAllCategoryById(string id);

    }
}
