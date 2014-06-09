using SkillSmart.Base.Entities;
namespace SkillSmart.Base.Services
{
    public interface IEntityService<T> where T : IEntity
    {
        void Create(T entity);

        T GetById(string id);

        void Update(T entity);

        void Delete(T entity);

    }
}
